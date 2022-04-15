export default (pageTranslations, i18n) => {
  const title = pageTranslations.title
  const description = pageTranslations.short_description
  return {
    title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      { hid: 'og:title', property: 'og:title', content: title },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      }
    ],
    htmlAttrs: {
      ...i18n.htmlAttrs
    }
  }
}
