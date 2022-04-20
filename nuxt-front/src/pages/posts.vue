<template>
  <section class="postList">
    <h1 class="postList__title">
      {{ $t('postsList') }}
    </h1>
    <ul v-if="sortedPosts">
      <li v-for="year in getYears" :key="year">
        <h2 class="postList__year">
          {{ year }}
          <span
            v-if="postsByYear(year).length > 0"
            class="postList__howMany"
          >
            {{ postsByYear(year).length }} {{ $t('items') }}
          </span>
        </h2>
        <ul
          v-if="postsByYear(year).length > 0"
          class="postList__items"
        >
          <post-card
            v-for="post in postsByYear(year)"
            :key="post.id"
            class="postList__card"
            :url="post.url"
          />
        </ul>
        <p v-else>
          {{ $t('noPosts') }}
        </p>
      </li>
    </ul>
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
      tag: null,
      sortedPosts: []
    }
  },
  computed: {
    getYears () {
      return this.posts
        ? [...new Set(this.posts.map(el =>
            new Date(el.published_date).getFullYear()
          ))].sort((a, b) => b - a)
        : []
    },
    filteredPosts () {
      let posts = this.sortedPosts
      if (this.category) {
        posts = posts.filter(el => el.category.name === this.category)
      }
      if (this.tag) {
        posts = posts.filter(el => el.tags.find(tagItem => tagItem.tags_id.name === this.tag) > 0)
      }
      return posts
    }
  },
  created () {
    this.title = this.$t('postsList')
    this.sortedPosts = JSON.parse(JSON.stringify(this.posts))
    this.sortedPosts.sort((a, b) =>
      (new Date(b.published_date) - new Date(a.published_date))
    )
    const params = this.$route.query
    if (params.category) {
      this.category = params.category
    }
    if (params.tag) {
      this.tag = params.tag
    }
  },
  methods: {
    postsByYear (year) {
      return this.filteredPosts.filter(el => new Date(el.published_date).getFullYear() === year)
    }
  }
}
</script>

<style lang="scss">
.postList {
  @apply p-4 md:p-0;
  &__title {
    @apply text-4xl font-headings text-tertiary my-4;
  }
  &__year {
    @apply text-quaternary text-xl md:text-2xl font-subheadings leading-tight mb-4 py-2 border-b-2 border-quaternary;
  }
  &__items {
    @apply flex flex-col md:flex-row flex-wrap mx-0 mb-16 place-content-start;
  }
  &__card {
    @apply mr-0 md:mr-4;
  }
  &__howMany {
    @apply text-sm ml-2
  }
}
</style>
