module.exports = {
  content: [
    './content/**/**.md',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        one: ['Hind Madurai', 'sans-serif'],
        two: ['Lora', 'sans-serif'],
        three: ['Montserrat', 'sans-serif']
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        quaternary: 'var(--quaternary)'
      }
    },
  },
  plugins: [],
}
