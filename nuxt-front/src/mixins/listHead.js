export default {
  data () {
    return {
      title: ''
    }
  },
  computed: {
    headTitle () {
      return this.title || ''
    }
  },
  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: this.title,
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      }
    }
  }
}
