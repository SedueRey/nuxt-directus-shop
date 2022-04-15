<template>
  <li
    class="lg:inline-block lg:px-4 lg:py-2"
  >
    <nuxt-link :to="localePath(page.url)">
      {{ $t(label) }}
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'MainFooterPage',
  props: {
    page: { type: Object, required: true }
  },
  computed: {
    label () {
      const url = this.page.url.replace('/', '').replaceAll('-', '')
      return (url !== '') ? url : 'home'
    }
  }
}
</script>
