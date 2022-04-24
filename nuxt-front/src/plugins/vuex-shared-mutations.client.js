import shareMutations from 'vuex-shared-mutations'

export default ({ store }) => {
  window.onNuxtReady((nuxt) => {
    shareMutations({
      predicate: ['addToCart', 'updateCartValue', 'removeFromCart', 'resetCard', 'setTheme']
    })(store)
  })
}
