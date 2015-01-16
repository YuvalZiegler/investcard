'use strict';
var App = require('./components/App.react.jsx');

var AppAPI = require('./utilities/InvestmentCardAPI');

React.render( <App/>, document.getElementById('application'));
AppAPI.init();




