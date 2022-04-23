export default ({ isStatic, locales, collections }) => {
  const returnData = []
  if (isStatic) {
    for (let col = 0; col < collections.length; col++) {
      const collection = collections[col]
      const data = require(`../static/directus-mocks/${collection.name}.json`)
      data.forEach((el) => {
        for (let i = 0; i < locales.length; i++) {
          returnData.push(`/${collection.url}/${locales[i]}/${el.url}`)
        }
      })
    }
  }
  return returnData
}
