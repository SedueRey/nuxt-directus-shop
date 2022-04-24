const bodyParser = require('body-parser');
const xss = require('xss-clean')

module.exports = function registerHook({init}, { logger }) {
    init('middlewares.before', async ({app}) => {
      app.use(bodyParser.urlencoded({
        extended: true,
      }));
      app.use(bodyParser.json());
      app.use(xss());
    });
};