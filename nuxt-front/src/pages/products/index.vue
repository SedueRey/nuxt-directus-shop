<template>
  <section class="productList">
    <h1 class="productList__title">
      {{ $t('productList') }}
    </h1>
    <ul class="productList__items">
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

<style lang="scss">
.productList {
  @apply p-4 md:p-0;
  &__title {
    @apply text-4xl font-headings text-tertiary my-4;
  }
  &__items {
    @apply flex flex-col md:flex-row flex-wrap mx-0 place-content-between;
  }
}
</style>
