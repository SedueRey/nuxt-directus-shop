<template>
  <div class="product-detail-template">
    <span v-if="style" class="embedded-styles">
      <style>{{ style.CSSPalette }}</style>
      <style>{{ style.Typographies }}</style>
    </span>
    <main-menu />
    <main>
      <Nuxt />
    </main>
    <main-footer />
  </div>
</template>

<script>
import themeHead from '~/mixins/themeHead'
export default {
  name: 'ProductDetail',
  mixins: [themeHead],
  data () {
    return {
      style: null
    }
  },
  async fetch () {
    this.style = await this.$getAllOptions()
    this.$store.commit('setOptions', this.style)
  }
}
</script>
