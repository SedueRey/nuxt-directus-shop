<template>
  <ul>
    <main-footer-page
      v-for="page in pages"
      :key="page.id"
      :page="page"
    />
  </ul>
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
