module.exports = {
  fs : require('fs'),
  axios : require('axios'),
  config : require('../../.directusshop.config.js'),
  host : process.env.DIRECTUS_BACKEND_URL,
}
