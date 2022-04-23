<template>
  <article class="checkout checkout-error">
    <h1>{{ $t('checkouterrortitle') }}</h1>
    <p>{{ $t('checkouterrortext') }}</p>
    <nuxt-link
      class="checkout-error__button"
      :to="localePath('cart')"
    >
      {{ $t('viewcart') }}
    </nuxt-link>
  </article>
</template>

<script>
import head from '~/mixins/head'
export default {
  name: 'CheckoutError',
  mixins: [head],
  data () {
    return {
      translate: {
        title: this.$t('checkouterrortitle')
      }
    }
  }
}
</script>

<style lang="scss">
.checkout-error {
  @apply min-h-screen text-2xl mt-8 px-4 text-center container mx-auto lg:px-64 space-y-8;
  h1 {
    @apply text-4xl text-tertiary font-headings leading-tight mt-16 mb-8 md:px-16;
  }
  &__button {
    @apply text-2xl font-headings hover:bg-quaternary;
    @apply inline-block text-center py-4 px-6 md:px-6;
    @apply border-quaternary text-secondary rounded-md border-2;
  }
}
</style>
