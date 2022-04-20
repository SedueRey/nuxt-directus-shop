<template>
  <section class="linktree">
    <nav v-if="media.length > 0">
      <ul class="linktree__menu">
        <li v-for="social in media" :key="social.social_media_url">
          <social-media-link :social="social" />
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import listHead from '~/mixins/listHead'
export default {
  name: 'SocialMediaPage',
  mixins: [listHead],
  async asyncData ({
    app,
    $getAllSocialMedia
  }) {
    const media = await $getAllSocialMedia()
    return {
      media
    }
  },
  created () {
    this.title = this.$t('linktree')
  }
}
</script>

<style lang="scss">
.linktree {
  @apply min-h-screen max-h-screen overflow-auto py-4;
  @apply flex flex-col items-center justify-center;
  &__menu {
    @apply space-y-8
  }
}
</style>
