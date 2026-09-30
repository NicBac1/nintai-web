import { buildWhatsappUrl } from './whatsapp';

/**
 * Intercept a form submit and open WhatsApp with a pre-filled message.
 * Used on static GitHub Pages — no third-party form backend required.
 */
export function wireWhatsappForm(
  form: HTMLFormElement,
  buildMessage: (data: FormData) => string,
): void {
  if (form.dataset.whatsappWired === 'true') return;
  form.dataset.whatsappWired = 'true';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const url = buildWhatsappUrl({ message: buildMessage(new FormData(form)) });
    window.open(url, '_blank', 'noopener');
  });
}

export function firstValue(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export function allValues(data: FormData, key: string): string[] {
  return data
    .getAll(key)
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .map((value) => value.trim());
}
