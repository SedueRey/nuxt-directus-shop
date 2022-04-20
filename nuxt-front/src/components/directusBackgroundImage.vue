<template>
  <div class="w-full h-full" :style="style" />
</template>
<script>
export default {
  name: 'DirectusBackgroundImage',
  props: {
    id: { type: String, required: true },
    size: { type: String, required: false, default: 'xs' },
    title: { type: String, required: false, default: '' }
  },
  computed: {
    url () {
      return `/directus-files/${this.id}/${this.size}`
    },
    jpg () {
      return `${this.url}.webp`
    },
    style () {
      return `
        background-image: url('${this.jpg}');
        background-repeat: no-repeat;
        background-size: cover;
      `
    }
  }
}
</script>
