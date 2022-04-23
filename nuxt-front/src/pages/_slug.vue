<template>
  <!-- eslint-disable vue/no-v-html -->
  <article
    :class="type"
    class="single"
    itemscope
    itemtype="http://schema.org/Article"
  >
    <aside v-if="post.cover_image" class="single__cover">
      <directus-image :id="post.cover_image.id" itemprop="image" size="cover" :title="translate.title" />
    </aside>
    <div class="single__inner">
      <h1 class="single__title" itemprop="name">
        {{ translate.title }}
      </h1>
      <shop-multiple-share
        :url="`${post.url}`"
        :title="translate.title"
        :description="translate.short_description"
      />
      <ol class="breadcrumbs" itemscope itemtype="https://schema.org/BreadcrumbList">
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <a itemprop="item" href="/">
            <span itemprop="name">{{ $t('appname') }}</span></a>
          <meta itemprop="position" content="1">
        </li>
        <li class="separator">
          //
        </li>
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="/posts"
        >
          <a
            itemscope
            itemtype="https://schema.org/WebPage"
            itemprop="item"
            itemid="/posts"
            href="/posts"
          >
            <span itemprop="name">{{ $t('posts') }}</span></a>
          <meta itemprop="position" content="2">
        </li>
        <li class="separator">
          //
        </li>
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span itemprop="name">{{ translate.title }}</span>
          <meta itemprop="position" content="3">
        </li>
      </ol>
      <h2 itemprop="abstract" class="single__shortDescription" v-html="translate.short_description" />
      <div v-if="isPost" class="single__metadata">
        <span>
          {{ $t('postCreated') }}: <time itemprop="datePublished" :datetime="post.published_date">{{ readableCreatedDate }}</time>
        </span>
        ,
        <span>
          {{ $t('postUpdated') }} <time itemprop="dateModified" :datetime="post.date_updated">{{ readableUpdatedDate }}</time>
        </span>
        <span v-if="category" itemprop="category">
          {{ $t('postUnder') }}
          <nuxt-link :to="`/posts?category=${category}`">
            {{ $t(`category${category}`) }}
          </nuxt-link>
        </span>
        <aside v-if="hasTags" itemprop="keywords">
          Tags:
          <nuxt-link v-for="tag in post.tags" :key="tag.id" :to="`/posts?tag=${tag.tags_id.name}`">
            {{ tag.tags_id.name }}
          </nuxt-link>
        </aside>
      </div>
      <span v-if="hasGallery">
        <directus-gallery :images="post.gallery" />
      </span>
      <div class="single__articleBody" itemprop="articleBody" v-html="translate.content" />
      <aside v-if="hasRelatedProducts" class="single__relatedProducts">
        <h1 class="single__relatedProductsTitle">
          Related products
        </h1>
        <ul class="single__relatedProductsList">
          <product-card
            v-for="product in post.related_product"
            :key="product.id"
            :url="product.manufacture_uuid.url"
          />
        </ul>
      </aside>
    </div>
  </article>
</template>

<script>
import head from '~/mixins/head'
export default {
  name: 'SlugPage',
  mixins: [head],
  layout: 'single',
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
      post, locale, translate
    }
  },
  computed: {
    category () {
      return this.post.category.name || ''
    },
    type () {
      return this.post.type || 'default'
    },
    isPost () {
      return this.post.type !== 'page'
    },
    hasRelatedProducts () {
      return this.post.related_product && this.post.related_product.length > 0
    },
    hasTags () {
      return this.post.tags && this.post.tags.length > 0
    },
    hasGallery () {
      return this.post.gallery && this.post.gallery.length > 0
    },
    languageFormat () {
      return {
        iso: this.locale.iso,
        type: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      }
    },
    readableCreatedDate () {
      return new Date(this.post.published_date)
        .toLocaleDateString(this.languageFormat.iso, this.languageFormat.type)
    },
    readableUpdatedDate () {
      return new Date(this.post.date_updated)
        .toLocaleDateString(this.languageFormat.iso, this.languageFormat.type)
    }
  }
}
</script>

<style lang="scss">
.single {
  @apply min-h-screen m-0 p-0;
  &__inner {
    @apply container mx-auto px-8 pt-8 pb-32 mt-2;
    @apply md:px-4 xl:px-48;
  }
  &__cover {
    @apply w-screen max-w-full;
    picture img {
      @apply w-screen max-w-full;
    }
  }
  &__title {
    @apply text-4xl text-tertiary font-headings leading-tight mt-8 mb-0;
  }
  &__metadata {
    @apply text-sm mb-4;
  }
  &__shortDescription {
    @apply text-quaternary text-xl md:text-2xl font-subheadings leading-tight my-2;
  }
  &__articleBody {
    @apply space-y-4 mt-8 ml-0 md:ml-20;
    a {
      @apply text-tertiary underline;
    }
  }
  &__relatedProducts  {
    @apply my-16;
  }
  &__relatedProductsTitle  {
    @apply text-2xl mb-4 text-tertiary font-headings;
  }
  &__relatedProductsList {
    @apply flex flex-col md:flex-row flex-wrap mx-0 place-content-between;
  }
}
.breadcrumbs {
  @apply py-4 text-sm flex flex-row justify-start;
  li {
    @apply mr-2;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a {
    @apply text-quaternary underline hover:line-through
  }
}
</style>
