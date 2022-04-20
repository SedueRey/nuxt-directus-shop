<template>
  <article class="event" itemscope itemtype="https://schema.org/Event">
    <!-- eslint-disable vue/no-v-html -->
    <h1 class="event__title" itemprop="name">
      {{ translate.title }}
    </h1>
    <ol class="breadcrumbs" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <a itemprop="item" href="/">
          <span itemprop="name">{{ $t('appname') }}</span></a>
        <meta itemprop="position" content="1">
      </li>
      <li class="separator">
        //
      </li>
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="/event"
      >
        <a
          itemscope
          itemtype="https://schema.org/WebPage"
          itemprop="item"
          itemid="https://example.com/books/sciencefiction"
          href="https://example.com/books/sciencefiction"
        >
          <span itemprop="name">{{ $t('events') }}</span></a>
        <meta itemprop="position" content="2">
      </li>
      <li class="separator">
        //
      </li>
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <span itemprop="name">{{ translate.title }}</span>
        <meta itemprop="position" content="3">
      </li>
    </ol>
    <h2 v-if="translate.excerpt" itemprop="about" class="event__excerpt" v-html="translate.excerpt" />
    <p class="event__metadata">
      {{ $t('eventfrom') }}
      <time itemprop="startDate" :datetime="event.startDate">{{ readableStartDate }}</time>
      {{ $t('eventto') }}
      <time itemprop="endDate" :datetime="event.endDate">{{ readableEndDate }}</time>
    </p>
    <client-only>
      <aside v-if="hasMap">
        <iframe
          v-if="hasMap"
          class="event__map"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          :src="mapUrl"
        />
        <a itemprop="location" :href="locationUrl" target="_blank" class="event__mapLink">
          {{ $t('moreinfoeventlocation') }}
        </a>
      </aside>
      <div class="event__body" itemprop="description" v-html="translate.description" />
    </client-only>
  </article>
</template>

<script>
import head from '~/mixins/head'
export default {
  name: 'EventDetailPage',
  mixins: [head],
  async asyncData ({
    app,
    params,
    $getEventsByUrl
  }) {
    const slug = params.slug
    const event = await $getEventsByUrl(slug)
    const locale = app.i18n.locales.find(el => el.code === app.i18n.locale)
    const translate = event.translations.find(el => el.languages_id === locale.lang_id)
    return {
      event, locale, translate
    }
  },
  computed: {
    hasMap () {
      return this.event && this.event.location.coordinates
    },
    mapUrl () {
      const bboxWidth = 0.0005
      const lat = this.event.location.coordinates[0]
      const long = this.event.location.coordinates[1]
      const latIni = lat - bboxWidth
      const latFin = lat + bboxWidth
      const longIni = long - bboxWidth
      const longFin = long + bboxWidth
      return `https://www.openstreetmap.org/export/embed.html?bbox=${
        latIni
      }%2C${
        longIni
      }%2C${
        latFin
      }%2C${
        longFin
      }&amp;layer=mapnik`
    },
    locationUrl () {
      const lat = this.event.location.coordinates[0]
      const long = this.event.location.coordinates[1]
      return `https://www.openstreetmap.org/#map=17/${long}/${lat}&amp;layers=N`
    },
    languageFormat () {
      return {
        iso: this.locale.iso,
        type: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      }
    },
    readableStartDate () {
      return new Date(this.event.startDate)
        .toLocaleDateString(this.languageFormat.iso, this.languageFormat.type)
    },
    readableEndDate () {
      return new Date(this.event.endDate)
        .toLocaleDateString(this.languageFormat.iso, this.languageFormat.type)
    }
  }
}
</script>

<style lang="scss">
.event {
  @apply min-h-screen m-0 p-4 md:px-8 xl:px-64;
  &__title {
    @apply text-4xl text-tertiary font-headings leading-tight mt-8 mb-0;
  }
  &__excerpt {
    @apply text-quaternary text-xl md:text-2xl font-subheadings leading-tight my-2;
  }
  &__body {
    @apply space-y-4 mt-8 w-64;
    a {
      @apply text-tertiary underline;
    }
  }
  &__metadata {
    @apply mb-4;
    time {
      @apply text-secondary italic;
    }
  }
  &__map {
    @apply w-full md:w-3/4 h-64
  }
  &__mapLink {
    @apply text-sm pb-4 underline;
  }
}
</style>
