const React = require('react');
const favicon = require('../../images/favicon.ico');
const messages = require('../../../config/messages.json');
const serialize = require('serialize-javascript');

const iconFonts = [
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];

const HtmlDocument = props => {

  const {webpackStats} = props;

  const style = iconFonts.concat(
    webpackStats.main.css
  );

  const script = [].concat(
    webpackStats.vendor.js,
    webpackStats.main.js
  );

  const strings = messages['en_US']; //FIXME: use user locale.
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href={favicon} />
        {style.map((href, key) => <link rel="stylesheet" type="text/css" href={href} key={key}/>)}
        <title>React App</title>
      </head>
      <body>
        <div id="root" />
        {script.map((src, key) => <script src={src} key={key} defer/>)}
        <script type="text/json" id="messages-bundle" dangerouslySetInnerHTML={{__html: serialize(strings)}} />
      </body>
    </html>
  )
}

module.exports = HtmlDocument;
