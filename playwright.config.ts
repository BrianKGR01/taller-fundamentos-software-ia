import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

function resolveLocalChromium(): string | undefined {
  if (process.env.CI || !process.env.LOCALAPPDATA) return undefined;
  const cacheDir = path.join(process.env.LOCALAPPDATA, 'ms-playwright');
  if (!fs.existsSync(cacheDir)) return undefined;
  const candidates = fs
    .readdirSync(cacheDir)
    .filter((name) => name.startsWith('chromium_headless_shell-'))
    .sort()
    .reverse();
  for (const dir of candidates) {
    const exe = path.join(cacheDir, dir, 'chrome-headless-shell-win64', 'chrome-headless-shell.exe');
    if (fs.existsSync(exe)) return exe;
  }
  return undefined;
}

const executablePath = resolveLocalChromium();
const launchOptions = executablePath ? { executablePath } : undefined;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4322',
    trace: 'on-first-retry',
    launchOptions,
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 }, launchOptions },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 }, launchOptions },
    },
  ],
  webServer: {
    command: 'pnpm preview --host 127.0.0.1 --port 4322',
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
