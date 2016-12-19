var chalk = require('chalk');

function runAppServer(port, cb) {
  // Start app server
  try {
    require('babel-register');
    require('babel-polyfill');

    require('../server').listen(port, () => {
      console.log();
      console.log(chalk.cyan('The App is running at: '+ port));
      console.log();

      if (cb) {
        cb();
      }
    });

  } catch(ex) {
    console.error(ex);
    throw new Error('Error starting app server', ex);
  }
}

module.exports = runAppServer
