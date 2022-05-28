<template>
  <section
    class="page"
    :class="category"
  >
    <!-- eslint-disable vue/no-v-html -->
    <h1 class="page__title">
      {{ translate.title }}
    </h1>
    <div v-if="translate" class="page__shortDescription" v-html="translate.short_description"></div>
    <div v-if="translate" class="page__description" v-html="translate.content"></div>
  </section>
</template>

<script>
import head from '~/mixins/head'
export default {
  name: 'IndexPage',
  mixins: [head],
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
  computed: {
    category () {
      return this.post.category.name || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  @apply py-4 px-2 min-h-screen xl:px-64;
  &__title {
    @apply text-tertiary text-5xl font-headings leading-tight;
  }
  &__shortDescription {
    @apply text-quaternary text-3xl font-subheadings leading-tight my-6;
  }
  &__description {
    @apply space-y-4
  }
}
</style>
