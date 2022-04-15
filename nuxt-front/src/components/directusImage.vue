<template>
  <picture class="directusImage">
    <source :srcset="webp" type="image/webp">
    <source :srcset="jpg" type="image/jpeg">
    <img :src="jpg" loading="lazy">
  </picture>
</template>
<script>
export default {
  name: 'DirectusImage',
  props: {
    id: { type: String, required: true },
    size: { type: String, required: false, default: 'xs' }
  },
  computed: {
    url () {
      return `/directus-files/${this.id}/${this.size}`
    },
    webp () {
      return `${this.url}.webp`
    },
    jpg () {
      return `${this.url}.webp`
    }
  }
}
</script>
