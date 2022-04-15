<template>
  <div class="single-template">
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
export default {
  name: 'SingleTemplate',
  data () {
    return {
      style: null
    }
  },
  async fetch () {
    this.style = await this.$getAllOptions()
  },
  head: {
    bodyAttrs: {
      class: 'antialiased bg-primary text-secondary font-sans text-lg'
    }
  }
}
</script>
