import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    paths: ['cart', 'preferTheme']
  })(store)
}
