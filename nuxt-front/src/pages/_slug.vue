<template>
  <article>
    <!-- eslint-disable vue/no-v-html -->
    {{ slug }} // {{ locale }}
    <hr>
    <h1>{{ translate.title }}</h1>
    <span class="block">{{ post.date_created }}</span>
    <span class="block">{{ post.date_updated }}</span>
    <span class="block">{{ post.category.name }}</span>
    <div v-html="translate.short_description" />
    <div v-html="translate.content" />
    <span v-if="post.gallery.length > 0" class="flex flex-row">
      <directus-image v-for="image in post.gallery" :id="image.directus_files_id" :key="image.id" size="xs" />
    </span>
    <hr>
    <aside v-if="post.related_product.length > 0">
      Related products
    </aside>
    <aside v-if="post.tags.length > 0">
      Tags
    </aside>
    <hr>
  </article>
</template>

<script>
import head from '~/mixins/head'
export default {
  name: 'SlugPage',
  mixins: [head],
  async asyncData ({
    app,
    params,
    $getPostByUrl
  }) {
    const slug = params.slug
    const post = await $getPostByUrl(slug)
    const locale = app.i18n.locales.find(el => el.code === app.i18n.locale)
    const translate = post.translations.find(el => el.languages_id === locale.lang_id)
    return {
      slug, post, locale, translate
    }
  }
}
</script>
