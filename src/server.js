
import React from 'react';
import ReactDomServer from 'react-dom/server';

export function createHtmlResponse ({
  webpackStats,
  request,
}) {
  const style = [].concat(
    webpackStats.main.css
  );

  const script = [].concat(
    webpackStats.vendor.js,
    webpackStats.main.js
  );

  return new Promise((resolve, reject) => {
    const html = ReactDomServer.renderToStaticMarkup(
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="./src/styles/favicon.ico" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
          {style.map((href, key) => <link rel="stylesheet" type="text/css" href={href} key={key}/>)}
          <title>React App</title>
        </head>
        <body>
          <div id="root" />
          {script.map((src, key) => <script src={src} key={key} defer/>)}
        </body>
      </html>
    );

    resolve({
      status: 200,
      body: `<!DOCTYPE html>${ html }`,
    });
  });
}
