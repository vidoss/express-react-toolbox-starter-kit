const React = require('react');
const {BrowserRouter} = require('react-router-dom');
const StandardLayout  = require('../common/containers/StandardLayout');

const AppMain = () => (
  <BrowserRouter>
    <StandardLayout>
      <h1>:-)</h1>
    </StandardLayout>
  </BrowserRouter>
);

module.exports = AppMain;
