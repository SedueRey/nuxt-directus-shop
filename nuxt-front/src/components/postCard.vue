<template>
  <li class="postCard__container">
    <nuxt-link
      v-if="post && translate"
      :to="`${url}`"
      class="postCard"
    >
      <div
        v-if="hasGallery"
        class="w-full overflow-hidden relative h-32"
      >
        <directus-image
          :id="post.gallery[0].directus_files_id"
          class="postCard__image absolute top-0 left-0 right-0"
          :title="translate.title"
          size="mdcard"
          style="transform:scale(2)"
        />
      </div>
      <span v-else class="postCard__canvas">
        {{ $t('noImageAvailable') }}
      </span>
      <h3 class="p-2">
        <span class="postCard__title">
          {{ translate.title }}
        </span>
      </h3>
      <!-- eslint-disable vue/no-v-html -->
      <p
        v-if="translate.short_description"
        class="postCard__excerpt"
        v-html="translate.short_description.substring(0, 100)"
      />
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    url: { type: String, required: true }
  },
  data () {
    return {
      translate: null,
      post: null
    }
  },
  async fetch () {
    this.post = await this.$getPostByUrl(this.url)
    const locale = this.$i18n.locales.find(el => el.code === this.$i18n.locale)
    this.translate = this.post.translations.find(el => el.languages_id === locale.lang_id)
  },
  computed: {
    hasGallery () {
      return this.post.gallery.length > 0
    }
  }
}
</script>

<style lang="scss">
.postCard {
  @apply block;
  &__container {
    @apply mb-8 rounded border-2 border-tertiary block w-full cursor-pointer;
    @apply hover:bg-quaternary hover:border-quaternary hover:shadow-lg;
    @screen md {
      width: calc(33% - 1rem);
    }
    @screen xl {
      width: calc(25% - 1rem);
    }
    &:hover {
      .postCard__canvas {
        @apply bg-quaternary;
      }
      .postCard__title {
        @apply text-primary;
      }
    }
  }
  &__canvas {
    @apply italic block h-32 flex items-center justify-center w-full bg-quaternary text-primary;
  }
  &__title {
    @apply font-headings text-tertiary;
  }
  &__excerpt {
    @apply text-sm p-2 block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
