'use strict';

var InvestmentCard = require('./InvestmentCard.react.jsx');
var InvestmentCardStore = require('../stores/InvestmentCardStore');
var Debug = require('./Debug.react.jsx');
var React = require('react/addons');

function getStateFromStores() {
  return InvestmentCardStore.getState();
}

var App = React.createClass({

    getDebugView:function(){
        return process.env.NODE_ENV === "development" ? <Debug/> : null;
    },

    getInitialState:function(){
        return {

        }
    },

    render: function() {
        
        return ( 
          <div id="application">
            {this.getDebugView()}
          </div>
        )
    },

    componentDidMount: function () {
        InvestmentCardStore.addChangeListener(this._onChange);
    },
     
    _onChange: function () {
        console.log("‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡");
        console.log("~~ App ::  _onChange ");
        console.log("‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡");
        this.setState( getStateFromStores() );
    }

});

module.exports = App;