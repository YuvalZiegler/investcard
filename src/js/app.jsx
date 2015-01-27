'use strict';
var React     = require('react');
var App       = require('./components/App.react.jsx');
var Controls  = require('./components/Controls.react.jsx');
var AppAPI    = require('./utilities/InvestmentCardAPI');

React.render( <App/>, document.getElementById('application'));
React.render( <Controls/>, document.getElementById('controls'));

AppAPI.init();




