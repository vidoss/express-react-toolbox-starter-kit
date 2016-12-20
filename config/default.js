const pkg = require('../package.json');
const messages = require('./messages.json');
// ports.
const DEV_SERVER_PORT   = 3000;
const APP_SERVER_PORT   = 7101;

const cspSelf = `'self'`;
const isProduction = process.env.NODE_ENV === 'production';

const contentSecurityPolicy = {
  defaultSrc: [cspSelf],

  scriptSrc: [cspSelf]
    .concat(!isProduction && `http://localhost:${DEV_SERVER_PORT}`)
    .concat(!isProduction && '\'unsafe-eval\'')
    .filter(Boolean),

  connectSrc: [cspSelf]
    .concat(!isProduction && `http://localhost:${DEV_SERVER_PORT}`)
    .concat(!isProduction && `ws://localhost:${DEV_SERVER_PORT}`)
    .filter(Boolean),

  styleSrc: [cspSelf, 'https://fonts.googleapis.com']
    .concat(!isProduction && 'blob:')
    .concat(!isProduction && `http://localhost:${DEV_SERVER_PORT}`)
    .filter(Boolean),

  fontSrc: [cspSelf, 'https://fonts.gstatic.com/']
    .concat(!isProduction && `http://localhost:${DEV_SERVER_PORT}`)
    .filter(Boolean),

  mediaSrc: [cspSelf],

  imgSrc: [
    cspSelf,
    '*.amazonaws.com'
  ]
  .concat(!isProduction && `http://localhost:${DEV_SERVER_PORT}`)
  .filter(Boolean)
};


const server = {
  name: pkg.name,
  version: pkg.version,
  port: APP_SERVER_PORT
};

const devServer = {
  name: pkg.name,
  version: pkg.version,
  port: DEV_SERVER_PORT
};

module.exports = {
  contentSecurityPolicy,
  server,
  devServer,
  messages
}
