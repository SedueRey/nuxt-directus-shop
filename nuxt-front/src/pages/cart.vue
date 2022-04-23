<template>
  <article class="cartpage">
    <h1 class="cartpage__title">
      {{ $t('shoppingcarttitle') }}
    </h1>
    <ul v-if="cart && cart.length > 0">
      <li v-for="item in cart" :key="item.url">
        <cart-list-item :item="item" />
      </li>
      <li class="cartpage__checkoutButtonContainer">
        <stripe-checkout
          ref="checkoutRef"
          mode="payment"
          :pk="pk"
          :line-items="lineItems"
          :success-url="successURL"
          :cancel-url="cancelURL"
          @loading="v => loading = v"
        />
        <button class="cartpage__checkoutButton" @click="checkout">
          Pay
          {{ totalCart }}
          <abbr :title="currency" class="cartListItem__currency">
            {{ currencyIcon }}
          </abbr>
          now!
        </button>
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
    this.pk = process.env.STRIPE_PK
    return {
      translate: {
        title: this.$t('shoppingcartpagetitle')
      },
      token: null,
      successURL: process.client && `${window.location.origin}${window.location.pathname}?state=success`,
      cancelURL: process.client && `${window.location.origin}${window.location.pathname}?state=error`,
      redirectState: ''
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
    },
    queryState () {
      return process.client && (new URLSearchParams(window.location.search).get('state') || '')
    },
    lineItems () {
      return this.cart.filter(el => el.stripePricePK !== null).map((el) => {
        return {
          price: el.stripePricePK,
          quantity: el.qty
        }
      })
    }
  },
  mounted () {
    if (this.queryState === 'success') {
      this.$router.replace('/checkout-success')
    }
    if (this.queryState === 'error') {
      this.$router.replace('/checkout-error')
    }
  },
  methods: {
    checkout () {
      this.loading = true
      this.$refs.checkoutRef.redirectToCheckout()
    },
    tokenCreated (token) {
      this.token = token
    }
  }
}
</script>

<style lang="scss">
.cartpage {
  @apply min-h-screen container mx-auto px-4 md:px-16 lg:px-48;
  &__title {
    @apply text-4xl text-tertiary font-headings leading-tight mt-8 mb-0;
  }
  &__noproducts {
    @apply text-2xl font-subheadings text-quaternary mt-4;
    a {
      @apply text-secondary hover:underline;
    }
  }
  &__checkoutButtonContainer {
    @apply text-center md:text-right border-secondary border-t-2 pt-16 md:pt-8;
  }
  &__checkoutButton {
    @apply text-2xl font-headings hover:bg-quaternary;
    @apply inline-block text-center py-4 px-6 md:px-6;
    @apply border-quaternary text-secondary rounded-md border-2;
  }
}
</style>
