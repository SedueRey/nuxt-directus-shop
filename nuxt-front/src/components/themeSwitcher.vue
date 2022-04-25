<template>
  <client-only>
    <span class="themeSwitcher" @click="toggle">
      <span v-if="isActive">🌚</span>
      <span v-else>🌞</span>
    </span>
  </client-only>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    themeValue () {
      return this.isActive ? 'dark' : 'light'
    }
  },
  mounted () {
    const hasTheme = this.$store.getters.hasTheme
    if (hasTheme) {
      this.isActive = this.$store.getters.activeTheme
    } else {
      this.isActive = window.matchMedia('prefers-color-scheme: dark')
      this.$store.commit('setTheme', this.themeValue)
    }
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive
      this.$store.commit('setTheme', this.themeValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.themeSwitcher {
  @apply block cursor-pointer;
}
</style>
