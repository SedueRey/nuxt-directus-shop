<template>
  <article class="cartpage">
    <h1 class="cartpage__title">
      {{ $t('shoppingcarttitle') }}
    </h1>
    <ul v-if="cart && cart.length > 0">
      <li v-for="item in cart" :key="item.url">
        <cart-list-item :item="item" />
      </li>
      <li class="cartpage__total">
        {{ totalCart }}
        <abbr :title="currency" class="cartListItem__currency">
          {{ currencyIcon }}
        </abbr>
      </li>
    </ul>
    <p v-else class="cartpage__noproducts">
      {{ $t('shoppingcartnoitems') }}
      <nuxt-link :to="localePath('products')">
        {{ $t('shoppingcartproducts') }}
      </nuxt-link>
    </p>
  </article>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import head from '~/mixins/head'
export default {
  name: 'CartPage',
  mixins: [head],
  data () {
    return {
      translate: {
        title: 'Cart'
      }
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['totalCart']),
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
  }
}
</script>

<style lang="scss">
.cartpage {
  @apply min-h-screen container mx-auto px-4 md:px-48 lg:px-96;
  &__title {
    @apply text-4xl text-tertiary font-headings leading-tight mt-8 mb-0;
  }
  &__noproducts {
    @apply text-2xl font-subheadings text-quaternary mt-4;
    a {
      @apply text-secondary hover:underline;
    }
  }
  &__total {
    @apply text-right text-4xl font-headings border-secondary border-t-2 pt-2;
  }
}
</style>
