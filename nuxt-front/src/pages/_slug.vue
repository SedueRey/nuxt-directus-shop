<template>
  <article>
    <style>{{ style.CSSPalette }}</style>
    <style>{{ style.Typographies }}</style>
    {{ slug }} // {{ locale }}
    <hr>
    <h1>{{ translate.title }}</h1>
    <span class="block">{{ post.date_created }}</span>
    <span class="block">{{ post.date_updated }}</span>
    <span class="block">{{ post.category.name }}</span>
    <!-- eslint-disable vue/no-v-html -->
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
    {{ post }}
  </article>
</template>

<script>
export default {
  name: 'SlugPage',
  async asyncData ({
    app,
    params,
    $getAllOptions,
    $getPostByUrl
  }) {
    const slug = params.slug // When calling /abc the slug will be "abc"
    const style = await $getAllOptions()
    const post = await $getPostByUrl(slug)
    const locale = app.i18n.locales.find(el => el.code === app.i18n.locale)
    const translate = post.translations.find(el => el.languages_id === locale.lang_id)
    return {
      style, slug, post, locale, translate
    }
  }
}
</script>
