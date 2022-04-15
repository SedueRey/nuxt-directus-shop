<template>
  <div>
    <h1 class="text-4xl font-headings text-tertiary bg-primary">
      {{ $t('linktree') }}
    </h1>
    <ul v-if="media.length > 0">
      <li v-for="social in media" :key="social.social_media_url">
        <a :href="social.social_media_url" target="_blank">
          {{ social.social_media_name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import listHead from '~/mixins/listHead'
export default {
  name: 'SocialMediaPage',
  mixins: [listHead],
  async asyncData ({
    app,
    $getAllSocialMedia,
    $getAllOptions
  }) {
    const media = await $getAllSocialMedia()
    const style = await $getAllOptions()
    return {
      media, style
    }
  },
  created () {
    this.title = this.$t('linktree')
  }
}
</script>
