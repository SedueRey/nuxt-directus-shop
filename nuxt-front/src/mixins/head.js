export default {
  head () {
    const title = this.translate.title || ''
    const shortDescription = this.translate.short_description || ''
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: shortDescription
        },
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: shortDescription
        }
      ],
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      }
    }
  }
}
