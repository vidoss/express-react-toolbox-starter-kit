const api = module.exports = require('express').Router();

api.use('/app', require('./app'))
