const staticBaseUrl = '/directus-mocks/'
const apiDirectusBaseUrl = 'items/'
const capitalizeFirstLetter = (str) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`.replace('_', '')
}

export default ({ app }, inject) => {
  inject('getAllOptions', async () => {
    const isFullStatic = app.$config.isFullStatic
    const url = isFullStatic ? `${staticBaseUrl}options.json` : `${app.$config.backendUrl}${apiDirectusBaseUrl}options?fields=*.*`
    const posts = await app.$axios.get(url)
      .then(r => r.data)
      .then(r => isFullStatic ? r[0] : r.data[0])
    return posts
  })
  inject('getAllSocialMedia', async () => {
    const isFullStatic = app.$config.isFullStatic
    const url = isFullStatic ? `${staticBaseUrl}social_media.json` : `${app.$config.backendUrl}${apiDirectusBaseUrl}social_media?fields=*.*`
    const socialMedia = await app.$axios.get(url)
      .then(r => r.data)
      .then(r => isFullStatic ? r : r.data)
    return socialMedia
  })
  inject('getAllPosts', async () => {
    const isFullStatic = app.$config.isFullStatic
    const url = isFullStatic ? `${staticBaseUrl}posts.json` : `${app.$config.backendUrl}${apiDirectusBaseUrl}posts?fields=*.*&filter[type][_eq]=post&filter[status][_eq]=published`
    const posts = await app.$axios.get(url)
      .then(r => r.data)
      .then(r => isFullStatic ? r.filter(el => el.type === 'post' && el.status === 'published') : r.data)
    return posts
  })
  inject('getAllPages', async () => {
    const isFullStatic = app.$config.isFullStatic
    const url = isFullStatic ? `${staticBaseUrl}posts.json` : `${app.$config.backendUrl}${apiDirectusBaseUrl}posts?fields=*.*&filter[type][_eq]=page&filter[status][_eq]=published`
    const posts = await app.$axios.get(url)
      .then(r => r.data)
      .then(r => isFullStatic ? r.filter(el => el.type === 'page' && el.status === 'published') : r.data)
    return posts
  })
  inject('getPostByUrl', async (urlPost) => {
    const isFullStatic = app.$config.isFullStatic
    const cleanUrlPost = urlPost.replaceAll('/', '')
    const url = isFullStatic ? `${staticBaseUrl}posts/${cleanUrlPost}.json` : `${app.$config.backendUrl}${apiDirectusBaseUrl}posts?fields=*.*&filter[url][_eq]=${urlPost}`
    const post = await app.$axios.get(url)
      .then(r => r.data)
      .then(r => isFullStatic ? r : r.data)
    return post
  })
  inject('getPageByUrl', async (urlPage) => {
    const isFullStatic = app.$config.isFullStatic
    const cleanUrlPage = urlPage.replaceAll('/', '')
    const url = isFullStatic ? `${staticBaseUrl}posts/${cleanUrlPage}.json` : `${app.$config.backendUrl}${apiDirectusBaseUrl}posts?fields=*.*&filter[url][_eq]=${urlPage}`
    const page = await app.$axios.get(url)
      .then(r => r.data)
      .then(r => isFullStatic ? r : r.data)
    return page
  })
  const directusCollections = ['events', 'manufacture']
  directusCollections.forEach((el) => {
    inject(`getAll${capitalizeFirstLetter(el)}`, async () => {
      const isFullStatic = app.$config.isFullStatic
      const url = isFullStatic ? `${staticBaseUrl}${el}.json` : `${app.$config.backendUrl}${apiDirectusBaseUrl}${el}?fields=*.*`
      const items = await app.$axios.get(url)
        .then(r => r.data)
        .then(r => isFullStatic ? r : r.data)
      return items
    })
    inject(`get${capitalizeFirstLetter(el)}ByUrl`, async (urlItem) => {
      const isFullStatic = app.$config.isFullStatic
      const cleanUrlPage = urlItem.replaceAll('/', '')
      const url = isFullStatic ? `${staticBaseUrl}${el}/${cleanUrlPage}.json` : `${app.$config.backendUrl}${apiDirectusBaseUrl}${el}?fields=*.*&filter[url][_eq]=${urlItem}`
      const item = await app.$axios.get(url)
        .then(r => r.data)
        .then(r => isFullStatic ? r : r.data)
      return item
    })
  })
}
