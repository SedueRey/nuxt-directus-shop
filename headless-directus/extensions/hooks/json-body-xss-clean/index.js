const bodyParser = require('body-parser');

module.exports = function registerHook({init}, { logger }) {
    init('middlewares.before', async ({app}) => {
      app.use(bodyParser.urlencoded({
        extended: true,
      }));
      app.use(bodyParser.json());
    });
};