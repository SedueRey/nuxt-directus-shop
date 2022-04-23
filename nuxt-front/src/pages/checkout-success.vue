<template>
  <article class="checkout checkout-success">
    <h1>✧･ﾟ: *✧･ﾟ:*<br>{{ $t('checkoutsuccesstitle') }}<br>*:･ﾟ✧*:･ﾟ✧</h1>
    <h2>{{ $t('checkoutsuccessslug') }}</h2>
    <p>{{ $t('checkoutsuccessthank') }}</p>
    <p>{{ $t('checkoutsuccesstext') }}</p>
  </article>
</template>

<script>
import head from '~/mixins/head'
export default {
  name: 'CheckoutSuccess',
  mixins: [head],
  data () {
    return {
      translate: {
        title: this.$t('checkoutsuccesstitle')
      }
    }
  },
  mounted () {
    this.$store.commit('resetCard')
  }
}
</script>

<style lang="scss">
.checkout-success {
  @apply text-2xl mt-8 text-center container mx-auto lg:px-32 space-y-4;
  h1 {
    @apply text-4xl text-tertiary font-headings leading-tight mt-16 mb-0 md:px-16;
  }
  h2 {
    @apply text-quaternary text-3xl font-subheadings leading-tight pb-16;
  }
}
</style>
