<template>
  <aside class="directusGallery">
    <span
      v-if="images.length > 1"
      class="directusGallery__list"
    >
      <directus-image
        v-for="image in images"
        :id="image.directus_files_id"
        :key="image.id"
        class="directusGallery__thumbnail"
        :class="active === image.directus_files_id ? 'is--active': ''"
        size="xs"
        :title="image.filename_disk"
        @clickImage="activeItem(image.directus_files_id)"
      />
    </span>
    <directus-image v-if="active" :id="active" :title="$t('selectedImage')" class="directusGallery__active" size="md" />
  </aside>
</template>

<script>
export default {
  name: 'DirectusGallery',
  props: {
    images: { type: Array, required: true },
    schema: { type: String, required: false, default: '' }
  },
  data () {
    return {
      active: null
    }
  },
  mounted () {
    if (this.images.length > 0) {
      this.active = this.images[0].directus_files_id
    }
  },
  methods: {
    activeItem (id) {
      this.active = id
    }
  }
}
</script>

<style lang="scss">
.directusGallery {
  @apply flex flex-col md:flex-row align-top;
  &__list {
    @apply w-48 flex flex-row md:flex-col md:w-auto order-8 md:order-1;
  }
  &__thumbnail {
    @apply cursor-pointer mr-2 mb-2 border-4 border-primary inline-block md:block;
    &:hover {
      @apply border-tertiary
    }
    &.is--active {
      @apply border-quaternary
    }
  }
  &__active {
    @apply order-2 mb-4;
  }
}
</style>
