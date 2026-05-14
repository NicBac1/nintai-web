/**
 * Single source of truth for site-wide config.
 * When this site is migrated to a real domain on Netlify in Phase 1,
 * update only the values here.
 */

export type AudienceKey =
  | 'colegio'
  | 'familia'
  | 'organizacion'
  | 'individual'
  | 'evento';

export interface AudienceMeta {
  key: AudienceKey;
  label: string;
  icon: string;
  blurb: string;
  anchor: string;
}

export const siteConfig = {
  businessName: 'Nintai',
  tagline: 'Cultivamos bienestar, impulsamos transformación',
  subtitle: 'Experiencias Psicoeducativas',
  description:
    'Experiencias psicoeducativas para comunidades educativas, familias y organizaciones en Bogotá, Fusagasugá y virtual.',
  whatsappNumber: '573154336209',
  email: 'hola@nintai.com.co',
  instagramHandle: 'psico_nintai',
  instagramUrl: 'https://instagram.com/psico_nintai',
  locations: ['Bogotá', 'Fusagasugá', 'Virtual'],
  formspreeEndpoint: 'https://formspree.io/f/CHANGE_ME', // swap with real Formspree form id
} as const;

export const audiences: AudienceMeta[] = [
  {
    key: 'colegio',
    label: 'Comunidades educativas',
    icon: 'lucide:graduation-cap',
    blurb:
      'Talleres y procesos para cuidar a quienes educan: docentes, directivos y comunidades escolares.',
    anchor: 'comunidades-educativas',
  },
  {
    key: 'familia',
    label: 'Familias',
    icon: 'lucide:heart-handshake',
    blurb:
      'Espacios para fortalecer vínculos, crianza consciente y bienestar emocional en el hogar.',
    anchor: 'familias',
  },
  {
    key: 'organizacion',
    label: 'Organizaciones',
    icon: 'lucide:building-2',
    blurb:
      'Bienestar para equipos: talleres y procesos que cultivan culturas más humanas y sostenibles.',
    anchor: 'organizaciones',
  },
  {
    key: 'individual',
    label: 'Procesos individuales',
    icon: 'lucide:sprout',
    blurb:
      'Acompañamiento personalizado para procesos de reflexión, crecimiento y transformación.',
    anchor: 'procesos-individuales',
  },
];

export const audienceByKey: Record<AudienceKey, AudienceMeta | undefined> = {
  colegio: audiences.find((a) => a.key === 'colegio'),
  familia: audiences.find((a) => a.key === 'familia'),
  organizacion: audiences.find((a) => a.key === 'organizacion'),
  individual: audiences.find((a) => a.key === 'individual'),
  evento: undefined,
};
