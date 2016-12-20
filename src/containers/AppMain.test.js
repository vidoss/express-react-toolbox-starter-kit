const React = require('react');
const ReactDOM = require('react-dom');
const AppMain = require('./AppMain');
const {Provider} = require('react-redux');
const { createStore } = require('redux');

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(()=>({
    app: {
      showError: false
    }
  }));
  ReactDOM.render(<Provider store={store}><AppMain /></Provider>, div);
});
