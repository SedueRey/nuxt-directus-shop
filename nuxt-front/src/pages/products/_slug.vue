<template>
  <div>
    Product detail
    <h1>{{ translate.title }}</h1>
  </div>
</template>

<script>
import head from '~/mixins/head'
export default {
  name: 'ProductDetailPage',
  mixins: [head],
  async asyncData ({
    app,
    params,
    $getManufactureByUrl
  }) {
    const slug = params.slug
    const product = await $getManufactureByUrl(slug)
    const locale = app.i18n.locales.find(el => el.code === app.i18n.locale)
    const translate = product.translations.find(el => el.languages_id === locale.lang_id)
    return {
      slug, product, locale, translate
    }
  }
}
</script>
