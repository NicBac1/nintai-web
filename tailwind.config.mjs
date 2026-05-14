/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F1ECDE',
          deep: '#E8E1CE',
        },
        sage: {
          DEFAULT: '#658266',
          deep: '#4E6650',
          tint: 'rgba(101, 130, 102, 0.08)',
        },
        ink: '#2E342A',
        muted: '#7A766B',
        warm: '#C9A57A',
      },
      fontFamily: {
        display: [
          '"Cormorant Garamond"',
          'Georgia',
          '"Times New Roman"',
          'serif',
        ],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2rem, 4vw + 0.75rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)', { lineHeight: '1.2' }],
      },
      maxWidth: {
        prose: '64ch',
        container: '1140px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        section: '5rem',
        'section-lg': '7rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(46, 52, 42, 0.04), 0 8px 24px rgba(46, 52, 42, 0.05)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 400ms ease-out both',
      },
    },
  },
  plugins: [],
};
