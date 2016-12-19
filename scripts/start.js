process.env.NODE_ENV = 'production';
process.env.BABEL_DISABLE_CACHE = 1;

var APP_SERVER_PORT = 7101;

require('./run')(APP_SERVER_PORT);
