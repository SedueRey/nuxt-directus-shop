module.exports = {
  content: [
    './content/**/**.md',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        paragraphs: ['Hind Madurai', 'sans-serif'],
        subheadings: ['Lora', 'sans-serif'],
        headings: ['Montserrat', 'sans-serif']
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
