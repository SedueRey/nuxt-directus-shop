<template>
  <article
    class="product"
    itemscope
    itemtype="http://schema.org/Product"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div class="product__inner">
      <h1 class="product__title" itemprop="name">
        {{ translate.title }}
      </h1>
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
          itemtype="/products"
        >
          <a
            itemscope
            itemtype="https://schema.org/WebPage"
            itemprop="item"
            itemid="https://example.com/books/sciencefiction"
            href="https://example.com/books/sciencefiction"
          >
            <span itemprop="name">{{ $t('products') }}</span></a>
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
      <h2 v-if="translate.excerpt" itemprop="slogan" class="product__excerpt" v-html="translate.excerpt" />
      <div v-if="category" class="product__metadata">
        {{ $t('postUnder') }}
        {{ $t(`category${category}`) }}
      </div>
      <p class="product__stock" itemprop="availability" :class="product.stock">
        {{ $t(`${product.stock}description`) }}
      </p>
      <div class="product__content">
        <div class="product__price">
          <span :class="product.stock">
            <span itemprop="price">
              {{ product.price }}
            </span>
            <abbr :title="currency" itemprop="priceCurrency" class="product__currency">
              {{ currencyIcon }}
            </abbr>
          </span>
          <button
            type="button"
            class="product__addToCart"
            :class="product.stock"
            :disabled="product.stock === 'soldout'"
          >
            Add to cart
          </button>
        </div>
        <div class="product__data">
          <span v-if="hasGallery">
            <directus-gallery itemprop="image" :images="product.gallery" />
          </span>
          <div class="product__body" itemprop="description" v-html="translate.description" />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import head from '~/mixins/head'
export default {
  name: 'ProductDetailPage',
  mixins: [head],
  layout: 'product-detail',
  async asyncData ({
    app,
    params,
    $getManufactureByUrl
  }) {
    const slug = params.slug
    const product = await $getManufactureByUrl(slug)
    const locale = app.i18n.locales.find(el => el.code === app.i18n.locale)
    const translate = product.translations.find(el => el.languages_id === locale.lang_id)
    return {
      product, translate
    }
  },
  computed: {
    category () {
      return this.product.category.length > 0
        ? this.product.category[0].categories_id?.name || ''
        : ''
    },
    hasGallery () {
      return this.product.gallery && this.product.gallery.length > 0
    },
    currency () {
      return this.$store.state.options
        ? this.$store.state.options.currency || ''
        : ''
    },
    currencyIcon () {
      return this.$store.state.options
        ? this.$store.state.options.currency_icon || ''
        : ''
    }
  }
}
</script>

<style lang="scss">
.product {
  @apply min-h-screen m-0 p-0;
  &__inner {
    @apply container mx-auto px-8 pt-8 pb-32 mt-2;
    @apply md:px-4 xl:px-48;
  }
  &__title {
    @apply text-4xl text-tertiary font-headings leading-tight mt-8 mb-0;
  }
  &__metadata {
    @apply text-sm mb-4;
  }
  &__excerpt {
    @apply text-quaternary text-xl md:text-2xl font-subheadings leading-tight my-2;
  }
  &__body {
    @apply space-y-4 mt-8 ml-0 md:ml-20;
    a {
      @apply text-tertiary underline;
    }
  }
  &__content {
    @apply md:flex md:flex-row-reverse md:justify-end;
  }
  &__price {
    @apply fixed bottom-0 left-0 right-0 py-4 px-8 bg-tertiary text-primary;
    @apply text-3xl md:text-4xl font-headings leading-tight md:ml-8 md:text-tertiary;
    @apply flex place-content-between md:block border-t-8 border-quaternary;
    @screen md {
      @apply p-0;
      border: unset;
      background: transparent;
      position: unset;
    }
    abbr {
      @apply border-none cursor-help;
    }
    .soldout {
      @apply cursor-not-allowed line-through;
    }
  }
  &__addToCart {
    @apply bg-quaternary text-sm font-sans text-secondary font-bold py-2 px-4 rounded;
    @apply md:block md:mt-4;
    &.soldout {
      @apply cursor-not-allowed opacity-50 text-primary;
    }
  }
  &__data {
    @apply md:w-3/5
  }
  &__stock {
    @apply italic mb-4 text-quaternary;
    &.soldout,
    &.lowstock {
      color: red;
    }
  }
}
</style>
