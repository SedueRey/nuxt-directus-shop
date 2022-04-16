<template>
  <picture class="directusImage">
    <source :srcset="webp" type="image/webp">
    <source :srcset="jpg" type="image/jpeg">
    <img :src="jpg" :alt="title" @click="launch">
  </picture>
</template>
<script>
export default {
  name: 'DirectusImage',
  props: {
    id: { type: String, required: true },
    size: { type: String, required: false, default: 'xs' },
    title: { type: String, required: false, default: '' }
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
  },
  methods: {
    launch () {
      this.$emit('clickImage', this.id)
    }
  }
}
</script>
