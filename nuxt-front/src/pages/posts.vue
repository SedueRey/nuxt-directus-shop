<template>
  <section>
    <h1 class="text-4xl font-headings text-tertiary bg-primary">
      {{ $t('postsList') }} {{ category }} {{ tag }}
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
  </section>
</template>

<script>
import listHead from '~/mixins/listHead'
export default {
  name: 'PostsPage',
  mixins: [listHead],
  layout: 'default',
  async asyncData ({
    app,
    $getAllPosts
  }) {
    const posts = await $getAllPosts()
    return {
      posts
    }
  },
  data () {
    return {
      category: null,
      tag: null
    }
  },
  created () {
    this.title = this.$t('postsList')
    const params = this.$route.query
    if (params.category) {
      this.category = params.category
    }
    if (params.tag) {
      this.tag = params.tag
    }
  }
}
</script>
