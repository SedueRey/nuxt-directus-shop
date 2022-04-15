<template>
  <div>
    Event detail
    <h1>{{ translate.title }}</h1>
  </div>
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
  }
}
</script>
