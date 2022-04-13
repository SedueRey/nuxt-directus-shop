<template>
  <section>
    <h1 class="text-4xl font-headings text-tertiary bg-primary">
      Posts
    </h1>
    <hr>
    <div v-if="posts">
      <p v-for="post in posts" :key="post.id">
        <nuxt-link :to="post.url">
          {{ post.url }}
          <span v-if="post.gallery.length > 0" class="flex flex-row">
            <directus-image v-for="image in post.gallery" :id="image.directus_files_id" :key="image.id" />
          </span>
        </nuxt-link>
      </p>
    </div>
    <hr>
    <h1 class="text-4xl font-headings text-tertiary bg-primary">
      Pages
    </h1>
    <hr>
    <div v-if="pages">
      <p v-for="page in pages" :key="page.id">
        {{ page.url }}
        <span v-if="page.gallery.length > 0" class="flex flex-row">
          <directus-image v-for="image in page.gallery" :id="image.directus_files_id" :key="image.id" />
        </span>
      </p>
    </div>
    <hr>
  </section>
</template>

<script>
export default {
  name: 'PostsPage',
  layout: 'default',
  async asyncData ({
    app,
    $getAllPosts,
    $getAllPages,
    $getAllOptions
  }) {
    const posts = await $getAllPosts()
    const pages = await $getAllPages()
    return {
      posts, pages
    }
  }
}
</script>
