const messages = module.exports = require('express').Router();
const config = require('config');

messages.get('/messages',(req, res, next) => {
  return res.send(config.get('messages'));
})
