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
    'Experiencias psicoeducativas para personas, comunidades educativas y empresas en Bogotá, Fusagasugá y virtual.',
  whatsappNumber: '573154336209',
  email: 'psiconintai@gmail.com',
  instagramHandle: 'psico_nintai',
  instagramUrl: 'https://instagram.com/psico_nintai',
  locations: ['Bogotá', 'Fusagasugá', 'Virtual'],
  formspreeEndpoint: 'https://formspree.io/f/mbglbkzo',
} as const;

/** Public service audiences — matches brochure: Personas, Comunidades educativas, Empresas. */
export const audiences: AudienceMeta[] = [
  {
    key: 'individual',
    label: 'Personas',
    icon: 'lucide:sprout',
    blurb:
      'Acompañamiento emocional a través de la psicoeducación: bienestar integral, procesos de transformación y encuentros de bienestar.',
    anchor: 'personas',
  },
  {
    key: 'colegio',
    label: 'Comunidades educativas',
    icon: 'lucide:graduation-cap',
    blurb:
      'Acompañamos la construcción de entornos emocionalmente seguros: aulas, estudiantes, familias y prevención.',
    anchor: 'comunidades-educativas',
  },
  {
    key: 'organizacion',
    label: 'Empresas',
    icon: 'lucide:building-2',
    blurb:
      'Estrategias de bienestar que se ajustan a sus equipos: cultura emocional, liderazgo consciente y programas anuales.',
    anchor: 'empresas',
  },
];

export const audienceByKey: Record<AudienceKey, AudienceMeta | undefined> = {
  colegio: audiences.find((a) => a.key === 'colegio'),
  familia: undefined,
  organizacion: audiences.find((a) => a.key === 'organizacion'),
  individual: audiences.find((a) => a.key === 'individual'),
  evento: undefined,
};
