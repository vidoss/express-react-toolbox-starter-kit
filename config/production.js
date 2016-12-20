const pkg = require('../package.json');
const APP_SERVER_PORT   = 7101;

const server = {
  name: pkg.name,
  version: pkg.version,
  port: APP_SERVER_PORT
}

module.exports = {
  server
}
