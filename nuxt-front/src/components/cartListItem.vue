<template>
  <div v-if="item" class="cartListItem">
    <h2 class="cartListItem__name">
      <nuxt-link :to="`/products/${item.url}`">
        {{ item.name }}
      </nuxt-link>
    </h2>
    <div class="cartListItem__container">
      <span>
        {{ item.qty }} x {{ item.price }}
        <abbr :title="currency" class="cartListItem__currency">
          {{ currencyIcon }}
        </abbr>
      </span>
      <span class="cartListItem__subtotal">
        {{ total }}
        <abbr :title="currency" class="cartListItem__currency">
          {{ currencyIcon }}
        </abbr>
      </span>
    </div>
    <span v-if="buttons" class="cartListItem__actions">
      <button
        class="cartListItem__actionButton"
        @click="addOne"
      >
        +1
      </button>
      <button
        class="cartListItem__actionButton"
        @click="removeOne"
      >
        -1
      </button>
      <button
        class="cartListItem__actionButton"
        @click="removeAll"
      >
        {{ $t('removecart') }}
      </button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CartListItem',
  props: {
    item: { type: Object, required: true },
    buttons: { type: Boolean, required: false, default: true }
  },
  computed: {
    total () {
      return (this.item.qty * this.item.price).toFixed(2)
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
    addOne () {
      this.$store.commit('addToCart', {
        url: this.item.url,
        name: this.item.title,
        price: this.item.price
      })
    },
    removeOne () {
      this.$store.commit('updateCartValue', {
        url: this.item.url,
        qty: (this.item.qty - 1)
      })
    },
    removeAll () {
      this.$store.commit('removeFromCart', this.item.url)
    }
  }
}
</script>

<style lang="scss">
.cartListItem {
  @apply text-xl;
  &__container {
    @apply flex flex-row justify-between;
    > * {
      @apply grow-0;
    }
  }
  &__name {
    @apply font-headings mt-4 hover:underline;
  }
  &__actions {
    @apply block mt-4 mb-8;
  }
  &__subtotal {
    @apply font-headings font-bold tracking-wide;
  }
  &__actionButton {
    @apply inline-block md:text-sm text-center py-1 px-6 md:px-2 mr-2;
    @apply border-quaternary text-secondary rounded-md border-2;
    @apply hover:bg-quaternary hover:text-primary;
  }
}
</style>
