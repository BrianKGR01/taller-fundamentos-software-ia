export interface SpeakerMetric {
  value: string;
  label: string;
  detail: string;
  accent: 'blue' | 'red' | 'yellow' | 'green';
}

export interface SpeakerHighlight {
  role: string;
  org: string;
  detail: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

/**
 * Datos del expositor extraídos directamente del CV oficial de Kevin Brayan Gómez Rocha.
 */
export const SPEAKER = {
  name: 'Kevin Brayan Gómez Rocha',
  headline: 'Arquitecto de Software · Mentor de Startups · Fundador Tecnológico',
  location: 'Santa Cruz de la Sierra, Bolivia',
  community: 'Google Developer Group (GDG) Santa Cruz',
  summary:
    'Fundador tecnológico y líder de proyectos de software con más de 7 años de experiencia en el ciclo completo de desarrollo. Dirijo equipos ágiles y productos digitales con estándares de calidad, testing automatizado y flujos asistidos por IA.',
  metrics: [
    {
      value: '7+ años',
      label: 'en desarrollo de software',
      detail: 'Arquitectura, ejecución ágil y entrega continua de productos digitales',
      accent: 'blue',
    },
    {
      value: '2 empresas',
      label: 'fundadas y dirigidas',
      detail: 'Drinks on Chain (trazabilidad Web3) y DevBro Solutions (consultora SDD)',
      accent: 'green',
    },
    {
      value: '3 regiones',
      label: 'EE. UU., Europa y LATAM',
      detail: 'Plataformas web, APIs, cloud GCP/AWS e IA en producción internacional',
      accent: 'yellow',
    },
    {
      value: 'GDG',
      label: 'organizador y speaker',
      detail: 'GDG Santa Cruz desde 2023 · Speaker en Tarija Tech Week 2026',
      accent: 'red',
    },
  ] satisfies SpeakerMetric[],
  highlights: [
    {
      role: 'CEO y Cofundador',
      org: 'Drinks on Chain',
      detail: 'Plataforma Web3 de trazabilidad de vinos y singani sobre Stellar (Soroban), piloto con Bodega Daroca y alianza UCB Tarija.',
    },
    {
      role: 'Fundador y Arquitecto Principal',
      org: 'DevBro Solutions',
      detail: 'Consultora técnica con Spec-Driven Development, testing automatizado, ERP CEOM y mentoría técnica a startups.',
    },
    {
      role: 'Trayectoria técnica y formación',
      org: 'Grazia IA · comocom GmbH · UAGRM',
      detail: 'Ingeniería Informática (UAGRM), Ethical Hacking Expert (EX), Full Stack IA, DevOps en GCP y liderazgo ágil.',
    },
  ] satisfies SpeakerHighlight[],
  contacts: [
    {
      label: 'Correo',
      value: 'brayankgr@gmail.com',
      href: 'mailto:brayankgr@gmail.com',
    },
    {
      label: 'WhatsApp',
      value: '(+591) 75020808',
      href: 'https://wa.me/59175020808',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/kevinbgr',
      href: 'https://www.linkedin.com/in/kevinbgr',
    },
    {
      label: 'Instagram',
      value: '@kevin_gomez_rocha',
      href: 'https://www.instagram.com/kevin_gomez_rocha',
    },
  ] satisfies ContactLink[],
  nextWorkshopUrl: 'https://taller-ttw-ia-empresas.vercel.app/',
  repoUrl: 'https://github.com/BrianKGR01/taller-fundamentos-software-ia',
};
