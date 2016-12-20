const config = require('config');

// Middleware.
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');

const setupMiddleware = server => {
  // Required middleware for passport to work in express
  // Note: cookie-parser is also used for anti-csrf measures, but we want it
  // loaded before passport is initialized
  server.use(cookieParser());
  // Parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: true }));
  // Parse application/json
  server.use(bodyParser.json());

  return Promise.resolve(server);
};

module.exports = server => setupMiddleware(server)
.then(args => {
  const csp = config.get('contentSecurityPolicy');
  // Compress all requests
  // Note: Compression inherently won't work with SSEs - see the docs at
  // https://github.com/expressjs/compression for examples of how to manage that
  server.use(compression());

  // The base helmet config gives us these 6 headers out of the box: Hide
  // X-Powered-By, HTTP Strict Transport Security, IE, restrict untrusted
  // HTML, Don't infer the MIME type, Frame Options to prevent clickjacking,
  // XSS Filter.
  server.use(helmet());

  // Disable client side caching.
  server.use(helmet.noCache());
  server.use(helmet.contentSecurityPolicy({ directives: csp }));

  // healthcheck end point.
  server.use('/healthcheck', (req, res) => res.status(200).send("OK!"));

  // Pass the configured server back.
  return server;
});
