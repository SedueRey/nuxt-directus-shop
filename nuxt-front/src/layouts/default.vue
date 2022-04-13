<template>
  <div class="default-template container page mx-auto">
    <span v-if="style" class="embedded-styles">
      <style>{{ style.CSSPalette }}</style>
      <style>{{ style.Typographies }}</style>
    </span>
    <main-menu />
    <main class="my-8 py-8">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultTemplate',
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
      class: 'antialiased'
    }
  }
}
</script>
