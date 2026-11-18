export interface SpeakerMetric {
  value: string;
  label: string;
  detail: string;
  accent: 'blue' | 'red' | 'yellow' | 'green';
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

/**
 * Datos del expositor extraídos del CV oficial de Kevin Brayan Gómez Rocha
 * y ajustados con su rol de mentor en CAINCO.
 */
export const SPEAKER = {
  name: 'Kevin Brayan Gómez Rocha',
  headline: 'Arquitecto de Software · Mentor de Startups · Fundador Tecnológico',
  location: 'Santa Cruz de la Sierra, Bolivia',
  community: 'Google Developer Group (GDG) Santa Cruz',
  summary:
    'Fundador tecnológico y líder de proyectos de software con más de 7 años de experiencia en el ciclo completo de desarrollo: estrategia, arquitectura, calidad, testing automatizado y flujos asistidos por IA.',
  metrics: [
    {
      value: '7+ años',
      label: 'en desarrollo de software',
      detail: 'Ciclo completo: arquitectura, estándares de calidad y entrega continua',
      accent: 'blue',
    },
    {
      value: '2 empresas',
      label: 'fundadas y dirigidas',
      detail: 'Drinks on Chain y DevBro Solutions',
      accent: 'green',
    },
    {
      value: '3 regiones',
      label: 'EE. UU., Europa y LATAM',
      detail: 'Plataformas web, cloud e IA en producción internacional',
      accent: 'yellow',
    },
    {
      value: 'GDG',
      label: 'organizador y speaker',
      detail: 'Google Developer Group Santa Cruz desde 2023',
      accent: 'red',
    },
    {
      value: 'CAINCO',
      label: 'mentor de startups',
      detail: 'Mentor del programa de startups de CAINCO en MVPs, UX y escalabilidad',
      accent: 'blue',
    },
  ] satisfies SpeakerMetric[],
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
