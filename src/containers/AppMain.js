const React = require('react');
const {BrowserRouter} = require('react-router');
const StandardLayout  = require('../common/containers/StandardLayout');

const AppMain = () => (
  <BrowserRouter>
    <StandardLayout>
      <h1> App here... </h1>
    </StandardLayout>
  </BrowserRouter>
);

module.exports = AppMain;
