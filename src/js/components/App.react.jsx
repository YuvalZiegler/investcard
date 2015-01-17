'use strict';

var InvestmentCard = require('./InvestmentCard.react.jsx');
var InvestmentCardStore = require('../stores/InvestmentCardStore');
var Debug = require('./Debug.react.jsx');
var React = require('react');

function getStateFromStores() {

  return InvestmentCardStore.getState();
}

var App = React.createClass({

    getDebugView:function(){
        return process.env.NODE_ENV === "development" ? <Debug/> : null;
    },

    getInitialState:function(){
        return getStateFromStores();
    },

    render: function() {

        var card = this.state;

        return (
          <div id="application">
            {this.getDebugView()}
            <InvestmentCard {...card}/>
          </div>
        )
    },

    componentDidMount: function () {
        InvestmentCardStore.addChangeListener(this._onChange);
    },
     
    _onChange: function () {
        var state =  getStateFromStores();
        console.log("~~ App ::  _onChange ", state );
        this.setState(state );
    }

});

module.exports = App;