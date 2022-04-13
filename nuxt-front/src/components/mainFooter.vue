<template>
  <ul>
    <li
      v-for="page in pages"
      :key="page.id"
      class="lg:inline-block lg:px-4 lg:py-2"
    >
      {{ page.dashboard_title }}
    </li>
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
