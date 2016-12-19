import requireUncached from 'require-uncached';

const possibleUncachedRequire = ("production" !== process.env.NODE_ENV ? requireUncached : require);

export default function(req, res, next) {
  const webpackStats = possibleUncachedRequire("../dist/webpack-stats.json");
  const {createHtmlResponse} = possibleUncachedRequire("../dist/main");

  return createHtmlResponse({
    webpackStats,
    request: {
      path: req.path,
      query: req.query,
    },
  })
  .then(({status, pathname, body}) => {
    if (302 === status) {
      res.redirect(pathname);
    } else {
      res.status(status).send(body);
    }
  }, next);
}
