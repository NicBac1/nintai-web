import { siteConfig, type AudienceKey } from './site';

/**
 * Default pre-filled message per audience. Each opens WhatsApp with
 * enough context that the conversation starts in the right place.
 */
const audienceMessages: Record<AudienceKey, string> = {
  colegio:
    'Hola, soy de una institución educativa y me gustaría conocer más sobre los talleres y procesos psicoeducativos para docentes.',
  familia:
    'Hola, soy madre/padre/familiar y me gustaría conocer más sobre los talleres y procesos para familias.',
  organizacion:
    'Hola, represento a una organización y me gustaría conocer más sobre los procesos de bienestar para nuestro equipo.',
  individual:
    'Hola, me interesa un proceso de acompañamiento individual y quisiera conversar.',
  evento: 'Hola, me gustaría conocer más sobre este encuentro.',
};

const DEFAULT_MESSAGE = 'Hola, me gustaría conocer más sobre Nintai.';

/**
 * Build a `wa.me` URL with a pre-filled message. The phone number lives in
 * one place (siteConfig). Audience-specific messages live in one place too.
 *
 * In Phase 3 (self-serve booking), this function can be replaced with a
 * dispatcher that returns either a wa.me URL or a /agenda URL based on a
 * BOOKING_MODE env var — without touching any consuming component.
 */
export function buildWhatsappUrl(opts?: {
  audience?: AudienceKey;
  message?: string;
  eventTitle?: string;
}): string {
  const phone = siteConfig.whatsappNumber;

  let text: string;
  if (opts?.message) {
    text = opts.message;
  } else if (opts?.eventTitle) {
    text = `Hola, me gustaría asistir al encuentro: ${opts.eventTitle}.`;
  } else if (opts?.audience) {
    text = audienceMessages[opts.audience];
  } else {
    text = DEFAULT_MESSAGE;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function defaultMessageFor(audience: AudienceKey): string {
  return audienceMessages[audience];
}
