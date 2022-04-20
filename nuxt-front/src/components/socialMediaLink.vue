<template>
  <a v-if="social" class="socialmedialink" :href="social.social_media_url" target="_blank">
    {{ social.social_media_name }}
    <span v-if="social.nsfw" class="socialmedialink__nsfw">
      ({{ $t('nsfw') }})
    </span>
  </a>
</template>

<script>
export default {
  name: 'SocialMediaLink',
  props: {
    social: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
.socialmedialink {
  @apply text-center p-4 border-quaternary text-secondary rounded-full font-bold;
  @apply hover:border-double hover:p-3 border-4 hover:border-8 w-96 block;
  &__nsfw {
    @apply italic text-sm;
  }
}
</style>
