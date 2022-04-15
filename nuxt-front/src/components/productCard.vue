<template>
  <li class="productCard__container">
    <nuxt-link
      v-if="product && translate"
      :to="`products/${url}`"
      class="productCard"
    >
      <div
        v-if="hasGallery"
        class="w-full overflow-hidden relative h-32"
      >
        <directus-image
          :id="product.gallery[0].directus_files_id"
          class="productCard__image absolute top-0 left-0 right-0"
          :title="translate.title"
          size="mdcard"
          style="transform:scale(2)"
        />
      </div>
      <span v-else class="productCard__canvas">
        {{ $t('noImageAvailable') }}
      </span>
      <h3 class="p-2">
        <span class="float-right">
          {{ product.price }} &euro;
        </span>
        {{ translate.title }}
      </h3>
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
      product: null
    }
  },
  async fetch () {
    this.product = await this.$getManufactureByUrl(this.url)
    const locale = this.$i18n.locales.find(el => el.code === this.$i18n.locale)
    this.translate = this.product.translations.find(el => el.languages_id === locale.lang_id)
  },
  computed: {
    hasGallery () {
      return this.product.gallery.length > 0
    }
  }
}
</script>

<style lang="scss">
.productCard {
  @apply block;
  &__container {
    @apply mb-8 rounded border-2 border-quaternary block w-full cursor-pointer;
    @apply hover:bg-tertiary hover:border-tertiary hover:shadow-lg;
    @screen md {
      width: calc(33% - 1rem);
    }
    @screen xl {
      width: calc(25% - 1rem);
    }
    &:hover {
      .productCard__canvas {
        @apply bg-tertiary;
      }
    }
  }
  &__canvas {
    @apply italic block h-32 flex items-center justify-center w-full bg-quaternary text-primary;
  }
}
</style>
