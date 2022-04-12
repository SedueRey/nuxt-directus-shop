module.exports = {
  mode: 'jit',
  content: [
    './src/components/**/*.{vue,js}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Hind Madurai', 'sans-serif'],
        subheadings: ['Lora', 'sans-serif'],
        headings: ['Montserrat', 'sans-serif']
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        quaternary: 'var(--quaternary)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
