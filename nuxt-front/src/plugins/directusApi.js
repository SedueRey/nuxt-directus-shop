const staticBaseUrl = '/directus-mocks/'
const apiDirectusBaseUrl = 'items/'
const capitalizeFirstLetter = (str) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`.replace('_', '')
}

export default ({ app }, inject) => {
  inject('getAllOptions', async () => {
    const isFullStatic = app.$config.isFullStatic
    if (isFullStatic) {
      const options = require('../static/directus-mocks/options.json')
      return options[0] || []
    } else {
      const url = `${app.$config.backendUrl}${apiDirectusBaseUrl}options?fields=*.*`
      const posts = await app.$axios.get(url)
        .then(r => r.data)
        .then(r => r.data[0])
      return posts
    }
  })
  inject('getAllSocialMedia', async () => {
    const isFullStatic = app.$config.isFullStatic
    if (isFullStatic) {
      return require('../static/directus-mocks/social_media.json')
    } else {
      const url = isFullStatic ? `${staticBaseUrl}social_media.json` : `${app.$config.backendUrl}${apiDirectusBaseUrl}social_media?fields=*.*`
      const socialMedia = await app.$axios.get(url)
        .then(r => r.data)
        .then(r => isFullStatic ? r : r.data)
      return socialMedia
    }
  })
  inject('getAllPosts', async () => {
    const isFullStatic = app.$config.isFullStatic
    if (isFullStatic) {
      const staticPosts = require(`../static${staticBaseUrl}posts.json`)
      return staticPosts.filter(el => el.type === 'post' && el.status === 'published')
    }
    const url = `${app.$config.backendUrl}${apiDirectusBaseUrl}posts?fields=*.*,related_product.manufacture_uuid.url,tags.*.name&filter[type][_eq]=post&filter[status][_eq]=published`
    const posts = await app.$axios.get(url)
      .then(r => r.data)
      .then(r => r.data)
    return posts
  })
  inject('getAllPages', async () => {
    const isFullStatic = app.$config.isFullStatic
    if (isFullStatic) {
      const staticPages = require(`../static${staticBaseUrl}posts.json`)
      return staticPages.filter(el => el.type === 'page' && el.status === 'published')
    }
    const url = `${app.$config.backendUrl}${apiDirectusBaseUrl}posts?fields=*.*,related_product.manufacture_uuid.url,tags.*.name&filter[type][_eq]=page&filter[status][_eq]=published`
    const posts = await app.$axios.get(url)
      .then(r => r.data)
      .then(r => r.data)
    return posts
  })
  inject('getPostByUrl', async (urlPost) => {
    const isFullStatic = app.$config.isFullStatic
    let cleanUrlPost = urlPost.replaceAll('/', '')
    if (isFullStatic) {
      if (cleanUrlPost === '') {
        cleanUrlPost = 'index'
      }
      return require(`../static${staticBaseUrl}posts/${cleanUrlPost}.json`)
    } else {
      const url = `${app.$config.backendUrl}${apiDirectusBaseUrl}posts?fields=*.*&filter[url][_eq]=${urlPost}`
      const post = await app.$axios.get(url)
        .then(r => r.data)
        .then(r => r.data)
      return post
    }
  })
  inject('getPageByUrl', async (urlPage) => {
    const isFullStatic = app.$config.isFullStatic
    let cleanUrlPage = urlPage.replaceAll('/', '')
    if (isFullStatic) {
      if (cleanUrlPage === '') {
        cleanUrlPage = 'index'
      }
      return require(`../static${staticBaseUrl}posts/${cleanUrlPage}.json`)
    } else {
      const url = `${app.$config.backendUrl}${apiDirectusBaseUrl}posts?fields=*.*&filter[url][_eq]=${urlPage}`
      const page = await app.$axios.get(url)
        .then(r => r.data)
        .then(r => r.data)
      return page
    }
  })
  const directusCollections = ['events', 'manufacture']
  directusCollections.forEach((el) => {
    inject(`getAll${capitalizeFirstLetter(el)}`, async () => {
      const isFullStatic = app.$config.isFullStatic
      if (isFullStatic) {
        return require(`../static${staticBaseUrl}${el}.json`)
      } else {
        const url = `${app.$config.backendUrl}${apiDirectusBaseUrl}${el}?fields=*.*`
        const items = await app.$axios.get(url)
          .then(r => r.data)
          .then(r => r.data)
        return items
      }
    })
    inject(`get${capitalizeFirstLetter(el)}ByUrl`, async (urlItem) => {
      const isFullStatic = app.$config.isFullStatic
      let cleanUrlPage = urlItem.replaceAll('/', '')
      if (isFullStatic) {
        if (cleanUrlPage === '') {
          cleanUrlPage = 'index'
        }
        return require(`../static${staticBaseUrl}${el}/${cleanUrlPage}.json`)
      } else {
        const url = `${app.$config.backendUrl}${apiDirectusBaseUrl}${el}?fields=*.*&filter[url][_eq]=${urlItem}`
        const item = await app.$axios.get(url)
          .then(r => r.data)
          .then(r => r.data)
        return item
      }
    })
  })
  inject('contactform', async (formData) => {
    const isFullStatic = app.$config.isFullStatic
    if (!isFullStatic) {
      const url = await `${app.$config.backendUrl}contact-form-api/`
      try {
        const res = await app.$axios.post(url, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        return res.data.status
      } catch (err) {
        return { status: err.message }
      }
    }
  })
}
