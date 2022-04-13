<template>
  <section>
    <!-- eslint-disable vue/no-v-html -->
    <h1>{{ translate.title }}</h1>
    <span class="block">{{ post.date_created }}</span>
    <span class="block">{{ post.date_updated }}</span>
    <span class="block">{{ post.category.name }}</span>
    <div v-html="translate.short_description" />
    <div v-html="translate.content" />
  </section>
</template>

<script>
import createSEOMeta from '~/utils/seo'
export default {
  name: 'IndexPage',
  async asyncData ({
    app,
    $getPostByUrl
  }) {
    const post = await $getPostByUrl('/')
    const locale = app.i18n.locales.find(el => el.code === app.i18n.locale)
    const translate = post.translations.find(el => el.languages_id === locale.lang_id)
    return {
      post, locale, translate
    }
  },
  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return createSEOMeta(this.translate, i18nHead)
  }
}
</script>
