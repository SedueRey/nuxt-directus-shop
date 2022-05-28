export default {
  head () {
    const theme = this.theme || ''
    const classTheme = (theme) ? `prefers-color-${theme}` : ''
    return {
      bodyAttrs: {
        class: `antialiased bg-primary text-secondary font-sans text-lg ${classTheme}`
      }
    }
  },
  computed: {
    theme () {
      return this.$store.getters.theme
    }
  }
}
