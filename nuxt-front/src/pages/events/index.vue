<template>
  <section>
    <h1 class="text-4xl font-headings text-tertiary bg-primary">
      Event list
    </h1>
    <hr>
    <div v-if="events">
      <p v-for="event in events" :key="event.id">
        <nuxt-link :to="`events/${event.url}`">
          {{ event.url }}
        </nuxt-link>
      </p>
    </div>
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
