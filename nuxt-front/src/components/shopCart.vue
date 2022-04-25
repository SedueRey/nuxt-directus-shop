<template>
  <aside v-if="cart" class="shopcart">
    <img
      class="shopcart__icon"
      src="/svg/cart.svg"
      alt="Shopping Cart icon"
      @click="toggle"
    >
    <span
      v-if="hasCart"
      class="shopcart__count"
      @click="toggle"
    >
      {{ countCart }}
    </span>
    <div
      v-if="hasCart && isExpanded"
      class="shopcart__bg"
      role="presentation"
      @click="toggle"
    />
    <div v-if="hasCart" class="shopcart__menu" :class="classCart">
      <ul class="shopcart__menuitems">
        <li v-for="item in cart" :key="item.url">
          <cart-list-item :item="item" :buttons="false" />
        </li>
        <li class="shopcart__total">
          {{ totalCart }}
          <abbr :title="currency" class="cartListItem__currency">
            {{ currencyIcon }}
          </abbr>
        </li>
      </ul>
      <nuxt-link
        class="shopcart__linkCart"
        :to="localePath('cart')"
      >
        <span class="block" @click="toggle">
          {{ $t('viewcart') }}
        </span>
      </nuxt-link>
    </div>
  </aside>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  data () {
    return {
      isExpanded: false
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['countCart', 'totalCart']),
    classCart () {
      return this.isExpanded ? 'is-expanded' : ''
    },
    hasCart () {
      return this.cart && this.cart.length > 0
    },
    currency () {
      return this.$store.state.options
        ? this.$store.state.options.currency || ''
        : ''
    },
    currencyIcon () {
      return this.$store.state.options
        ? this.$store.state.options.currency_icon || ''
        : ''
    }
  },
  methods: {
    toggle () {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style lang="scss">
.shopcart {
  @apply fixed;
  right: 2rem;
  top: 2.1rem;
  &::before {
    content: "";
    background-color: var(--primary);
    border-radius: 0.875rem;
    display: block;
    height: 3.5rem;
    margin: -0.9rem 0 0 -1.2rem;
    position: absolute;
    width: 3.5rem;
    z-index: 0;
    @screen lg {
      display: none;
    }
  }
  @screen lg {
    @apply right-4 top-4;
  }
  &__icon {
    @apply w-5 cursor-pointer block;
    transform: scale(2.2);
    filter: invert(1);
    @media (prefers-color-scheme: light) {
      filter: invert(0)
    }
    @screen lg {
      filter: invert(1);
      transform: scale(1);
    }
  }
  &__count {
    @apply rounded px-2 md:text-sm block text-center select-none cursor-pointer;
    @apply md:w-4 md:h-4 md:p-0;
    position: relative;
    top: -0.25rem;
    right: -0.5rem;
    background-color: #be4444;
  }
  &__menuitems {
    @apply p-4;
  }
  &__linkCart {
    @apply p-4 border-secondary border-t-2;
    .product-detail-template & {
      @apply border-b-4 md:border-b-0;
    }
  }
  &__bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.35);
    z-index: 0;
    cursor: pointer;
    @screen lg {
      top: 3.5rem;
    }
  }
  &__menu {
    @apply hidden z-10 drop-shadow-lg;
    &.is-expanded {
      @apply block;
      position: fixed;
      right: 0;
      bottom: 0;
      top: 0rem;
      width: 80vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: var(--menu);
      @screen lg {
        top: 3.5rem;
        width: 25rem;
      }
      .product-detail-template & {
        bottom: 4.7rem;
        @screen md {
          bottom: 0;
        }
      }
    }
  }
  &__total {
    @apply mt-8 text-right text-4xl font-headings border-secondary border-t-2 pt-2;
  }
}
</style>
