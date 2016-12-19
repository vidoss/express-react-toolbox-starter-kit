import express from 'express';
import bodyParser from 'body-parser';
import render from './render';

const server = express();
const IS_PRODUCTION = "production" === process.env.NODE_ENV;

server.use(bodyParser.json());

if (IS_PRODUCTION) {
  // On production, use the public directory for static files
  // This directory is created by webpack on build time.
  server.use(express.static(`${__dirname}/../dist`));
}

// This endpoint is required to report health when
// Elastic Load Balancers (ELBs) are used
server.get("/healthcheck", function(req, res) {
  res.status(200).send("OK!");
});

// Render the app server-side and send it as response.
server.get("/*", render);

// Catch server error
server.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

module.exports = server;
