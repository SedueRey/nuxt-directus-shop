<template>
  <div class="link-tree-template">
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
  name: 'LinkTreeTemplate',
  data () {
    return {
      style: null
    }
  },
  async fetch () {
    this.style = await this.$getAllOptions()
    this.$store.commit('setOptions', this.style)
  },
  head: {
    bodyAttrs: {
      class: 'antialiased bg-primary text-secondary font-sans text-lg'
    }
  }
}
</script>
