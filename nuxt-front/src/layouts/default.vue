<template>
  <div class="default-template">
    <span v-if="style" class="embedded-styles">
      <style>{{ style.CSSPalette }}</style>
      <style>{{ style.Typographies }}</style>
    </span>
    <main-menu />
    <main class="my-8 py-8 container mx-auto">
      <Nuxt />
    </main>
    <main-footer />
  </div>
</template>

<script>
import themeHead from '~/mixins/themeHead'
export default {
  name: 'DefaultTemplate',
  mixins: [themeHead],
  data () {
    return {
      style: {
        CSSPalette: '',
        Typographies: ''
      }
    }
  },
  async fetch () {
    this.style = await this.$getAllOptions()
    this.$store.commit('setOptions', this.style)
  }
}
</script>
