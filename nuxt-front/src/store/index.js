export const state = () => ({
  options: null,
  cart: []
})

export const mutations = {
  setOptions (state, options) {
    state.options = options
  },
  addToCart (state, cartItem) {
    const existsAtIndex = state.cart.findIndex(el => el.url === cartItem.url)
    if (existsAtIndex !== -1) {
      const item = state.cart[existsAtIndex]
      state.cart[existsAtIndex] = { ...item, qty: (item.qty + 1) }
      // To deal with deep nested vuex reactivity
      state.cart.push({})
      state.cart.pop()
    } else {
      state.cart.push({
        url: cartItem.url,
        qty: 1,
        name: cartItem.name,
        price: cartItem.price
      })
    }
  },
  updateCartValue (state, cartData) {
    const existsAtIndex = state.cart.findIndex(el => el.url === cartData.url)
    if (existsAtIndex !== -1) {
      if (cartData.qty === 0) {
        state.cart.splice(existsAtIndex, 1)
      } else {
        const item = state.cart[existsAtIndex]
        state.cart[existsAtIndex] = { ...item, qty: cartData.qty }
        // To deal with deep nested vuex reactivity
        state.cart.push({})
        state.cart.pop()
      }
    }
  },
  removeFromCart (state, cartItemPK) {
    const existsAtIndex = state.cart.findIndex(el => el.url === cartItemPK)
    if (existsAtIndex !== -1) {
      state.cart.splice(existsAtIndex, 1)
    }
  },
  resetCard (state) {
    state.cart = []
  }
}

export const getters = {
  totalCart: (state) => {
    let total = 0
    state.cart.forEach((el) => {
      total = total + (el.price * el.qty)
    })
    return total.toFixed(2)
  },
  countCart: (state) => {
    let total = 0
    state.cart.forEach((el) => {
      total = total + el.qty
    })
    return total
  }
}
