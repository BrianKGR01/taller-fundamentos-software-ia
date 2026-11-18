import QRCode from 'qrcode';

/**
 * Genera un SVG limpio y accesible de código QR para proyectar y escanear en sala.
 */
export async function generateQrSvg(url: string): Promise<string> {
  return QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    color: {
      dark: '#1f1f1f',
      light: '#ffffff',
    },
  });
}
