<template>
  <footer class="bg-menu text-secondary px-4 mt-8 py-4 lg:py-2 lg:px-4 text-sm">
    <ul class="container mx-auto">
      <main-footer-page
        v-for="page in pages"
        :key="page.id"
        :page="page"
      />
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
  data () {
    return {
      pages: []
    }
  },
  async fetch () {
    this.pages = await this.$getAllPages()
  }
}
</script>
