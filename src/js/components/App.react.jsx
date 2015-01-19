'use strict';

var Cards         = require('./Cards.react.jsx');
var Controls         = require('./Controls.react.jsx');
var Notifications = require('./Notifications.react.jsx');
var React         = require('react');
var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var App = React.createClass({
    render: function() {
        return (
          <div>

            <Cards/>
            <Controls/>
            <Notifications/>
          </div>
        )
    }
});

module.exports = App;