<template>
  <div
    id="menu"
    class="menu"
  >
    <!-- eslint-disable vue/no-v-html -->
    <span
      class="text-3xl hamburger"
      @click="toggleMenu"
    >
      <div class="hamburger__inner">
        <span class="" />
        <span class="" />
        <span class="" />
      </div>
    </span>
    <span class="menu__bg" @click="hideMenu" />
    <nav class="menu__items p-5 shadow-2xl lg:shadow-lg lg:p-2 lg:bg-quaternary lg:text-secondary">
      <p
        class="text-2xl font-headings pb-16 font-bold lg:hidden"
        v-html="$t('menulabel')"
      />
      <ul
        class="menu__menulist text-xl space-y-6 text-base lg:text-right lg:space-y-0 lg:container lg:mx-auto"
        @click="hideMenu"
      >
        <li v-if="showTitle" class="menu__title">
          <nuxt-link :to="localePath('index')">
            {{ $t('appname') }}
          </nuxt-link>
        </li>
        <li class="lg:inline-block lg:px-4 lg:py-2">
          <nuxt-link :to="localePath('index')">
            {{ $t('home') }}
          </nuxt-link>
        </li>
        <li class="lg:inline-block lg:px-4 lg:py-2">
          <nuxt-link :to="localePath('/about-me')">
            {{ $t('aboutme') }}
          </nuxt-link>
        </li>
        <li class="lg:inline-block lg:px-4 lg:py-2">
          <nuxt-link :to="localePath('posts')">
            {{ $t('posts') }}
          </nuxt-link>
        </li>
        <li class="lg:inline-block lg:px-4 lg:py-2">
          <nuxt-link :to="localePath('events')">
            {{ $t('events') }}
          </nuxt-link>
        </li>
        <li class="lg:inline-block lg:px-4 lg:py-2">
          <nuxt-link :to="localePath('linktree')">
            {{ $t('linktree') }}
          </nuxt-link>
        </li>
        <li class="lg:inline-block lg:px-4 lg:py-2">
          <nuxt-link :to="localePath('products')">
            {{ $t('products') }}
          </nuxt-link>
        </li>
        <li v-if="$i18n.locale !== 'en'" class="lg:inline-block lg:px-4 lg:py-2">
          <nuxt-link class="text-md ..." :to="switchLocalePath('en')">
            EN
          </nuxt-link>
        </li>
        <li v-if="$i18n.locale !== 'es'" class="lg:inline-block lg:px-4 lg:py-2">
          <nuxt-link class="text-md ..." :to="switchLocalePath('es')">
            ES
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  data () {
    return {
      opened: false,
      pages: []
    }
  },
  async fetch () {
    this.pages = await this.$getAllPages()
  },
  computed: {
    showLogo () {
      return this.$store.state.options
        ? this.$store.state.options.showLogo || true
        : true
    },
    showTitle () {
      return this.$store.state.options
        ? this.$store.state.options.showTitle || true
        : true
    }
  },
  methods: {
    toggleMenu () {
      this.opened = !this.opened
      if (document && document.body) {
        document.body.classList.toggle('opened-menu')
      }
    },
    hideMenu () {
      this.opened = false
      if (document && document.body) {
        document.body.classList.remove('opened-menu')
      }
    }
  }
}
</script>

<style lang="scss">
.hamburger {
  cursor: pointer;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 3;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);
  background-color: var(--primary);
  padding: 0.9rem 0.7rem;
  border-radius: 100%;
  transform: rotate(13deg);
  &__inner {
    transform: rotate(-13deg);
  }
  &__inner > span {
    display: block;
    width: 2.25rem;
    height: 0.35rem;
    background-color:  var(--secondary);
    margin-bottom: 0.35rem;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1.000);
    transform: none;
    position: relative;
    opacity: 1;
    &:last-child {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1024px) {
    display: none;
  }
}
@media (max-width: 1023px) {
  .menu {
    &__bg {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      background-color: rgba(0,0,0,0.65);
      z-index: 1;
      display: none;
    }
    &__items {
      z-index: 2;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      overflow: auto;
      background-color: var(--tertiary);
      color: var(--secondary);
      width: 88vw;
      transform: translateX(-100vw);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);;
      a {
        color: var(--secondary);
        @apply no-underline hover:underline;
      }
    }
  }

  body.opened-menu {
    overflow-y: hidden;
    .hamburger {
      left: 73vw;
      color: var(--secondary);
      background-color: transparent;
      &__inner > span {
        background-color: var(--secondary);
      }
      &__inner > span:first-child {
        transform: rotate(-45deg);
        top: 0.6rem;
        height: 0.15rem;
      }
      &__inner > span:last-child {
        transform: rotate(45deg);
        top: -0.6rem;
        height: 0.15rem;
      }
      &__inner > span:nth-child(2) {
        opacity: 0;
      }
    }
    .menu {
      &__bg {
        display: block;
      }
      &__items {
        transform: translateX(0);
      }
      &__title {
        @apply font-headings text-2xl my-4
      }
    }
  }
}

@media (min-width: 1024px) {
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    &__items {
      background-color: #348185;
    }
    &__title {
      @apply font-headings float-left text-xl mt-1 ml-3
    }
    a {
      color: #FFF;
      font-weight: 400;
      letter-spacing: 0.02em;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
