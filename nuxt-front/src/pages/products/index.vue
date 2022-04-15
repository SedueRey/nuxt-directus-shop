<template>
  <section>
    <h1>
      {{ $t('productList') }}
    </h1>
    <ul class="single__relatedProductsList">
      <product-card
        v-for="product in products"
        :key="product.id"
        :url="product.url"
      />
    </ul>
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
