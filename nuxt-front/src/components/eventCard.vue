<template>
  <li class="eventCard__container">
    <nuxt-link
      v-if="event && translate"
      :to="`events/${url}`"
      class="eventCard"
    >
      <h2 class="eventCard__title">
        {{ translate.title }}
      </h2>
      <!-- eslint-disable vue/no-v-html -->
      <p
        v-if="translate.excerpt"
        class="eventCard__excerpt"
        v-html="translate.excerpt.substring(0, 100)"
      ></p>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    url: { type: String, required: true }
  },
  data () {
    return {
      translate: null,
      event: null
    }
  },
  async fetch () {
    this.event = await this.$getEventsByUrl(this.url)
    const locale = this.$i18n.locales.find(el => el.code === this.$i18n.locale)
    this.translate = this.event.translations.find(el => el.languages_id === locale.lang_id)
  }
}
</script>

<style lang="scss">
.eventCard {
  @apply block;
  &__container {
    @apply mb-8 rounded border-2 border-quaternary block w-full cursor-pointer;
    @apply hover:border-secondary hover:shadow-lg;
    @screen md {
      width: calc(33% - 1rem);
    }
    @screen xl {
      width: calc(25% - 1rem);
    }
  }
  &__title {
    @apply font-headings text-quaternary p-2;
  }
  &__excerpt {
    @apply text-sm p-2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
