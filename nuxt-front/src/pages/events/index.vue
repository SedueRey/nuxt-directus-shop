<template>
  <section class="eventList">
    <h1 class="eventList__title">
      Event list
    </h1>
    <ul v-if="events.length > 0" class="eventList__items">
      <event-card
        v-for="event in events"
        :key="event.id"
        :url="event.url"
      />
    </ul>
    <p v-else>
      {{ $t('noevents') }}
    </p>
  </section>
</template>

<script>
import listHead from '~/mixins/listHead'
export default {
  name: 'EventListPage',
  mixins: [listHead],
  layout: 'default',
  async asyncData ({
    app,
    $getAllEvents
  }) {
    const events = await $getAllEvents()
    return {
      events
    }
  },
  created () {
    this.title = this.$t('eventList')
  }
}
</script>

<style lang="scss">
.eventList {
  @apply min-h-screen p-4 md:p-0;
  &__title {
    @apply text-4xl font-headings text-tertiary my-4;
  }
  &__items {
    @apply flex flex-col md:flex-row flex-wrap mx-0 place-content-between;
  }
}
</style>
