<template>
  <client-only>
    <aside v-click-outside="hide" class="shopMultipleShare">
      <img
        class="shopMultipleShare__icon"
        src="/svg/share.svg"
        alt="Share icon"
        @click="toggle"
      >
      <div
        v-if="isExpanded"
        class="shopMultipleShare__networks"
      >
        {{ $t('share') }}
        <share-network
          v-for="network in networks"
          :key="network"
          :network="network"
          :url="finalUrl"
          :title="title"
          :description="filteredDescription"
          quote="description"
          class="shopMultipleShare__networkItem"
        >
          <span class="shopMultipleShare__networkName">
            {{ network }}
          </span>
        </share-network>
      </div>
    </aside>
  </client-only>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'ShopMultipleShare',
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  data () {
    return {
      isExpanded: false,
      networks: ['twitter', 'facebook', 'email', 'telegram', 'whatsapp', 'baidu']
    }
  },
  computed: {
    finalUrl () {
      return `${process.env.productionUrl}${this.url}`
    },
    filteredDescription () {
      if (!process.client) {
        return ''
      }
      const div = document.createElement('div')
      div.innerHTML = this.description
      const text = div.textContent || div.innerText || ''
      return text
    }
  },
  methods: {
    toggle () {
      this.isExpanded = !this.isExpanded
    },
    hide () {
      this.isExpanded = false
    }
  }
}
</script>

<style lang="scss">
.shopMultipleShare {
  @apply float-right relative;
  &__icon {
    @apply cursor-pointer block w-6 md:w-8 ml-4;
    filter: invert(1);
    @media (prefers-color-scheme: light) {
      filter: invert(0)
    }
    body.prefers-color-light & {
      filter: invert(0)
    }
  }
  &__networks {
    @apply bg-menu text-secondary font-bold absolute p-4 pb-0 rounded-lg shadow-lg right-0 top-12;
  }
  &__networkItem {
    @apply block text-center bg-primary rounded-md py-4 px-16 mb-4 mt-4;
  }
  &__networkName {
    display: block;
    &::first-letter {
      text-transform: uppercase;
    }
  }
}
</style>
