<template>
  <section>
    <h1 class="text-4xl font-headings text-tertiary bg-primary">
      {{ $t('productList') }}
    </h1>
    <hr>
    <div v-if="products">
      <p v-for="product in products" :key="product.id">
        <nuxt-link :to="`products/${product.url}`">
          {{ product.url }}
          <span v-if="product.gallery.length > 0" class="flex flex-row">
            <directus-image v-for="image in product.gallery" :id="image.directus_files_id" :key="image.id" />
          </span>
        </nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
import listHead from '~/mixins/listHead'
export default {
  name: 'ProductListPage',
  mixins: [listHead],
  layout: 'default',
  async asyncData ({
    app,
    $getAllManufacture
  }) {
    const products = await $getAllManufacture()
    return {
      products
    }
  },
  created () {
    this.title = this.$t('productList')
  }
}
</script>
