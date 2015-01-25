'use strict';

var InvestmentCardStore = require('../stores/InvestmentCardStore');
var InvestmentCard      = require('./invest-card/InvestmentCard.react.jsx');
var React               = require('react');

function getStateFromStores() {
  return { card: InvestmentCardStore.getState() };
}

var Cards = React.createClass({

  getInitialState:function(){
    return {  }
  },

  render: function() {
    var card = this.state.card;
    return ( <InvestmentCard {...card}/> );
  },

  componentDidMount: function () {
    InvestmentCardStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    var state =  getStateFromStores();
    console.log("☯ Cards       :: STATE UPDATE" );
    this.setState(state);
  }

});

module.exports = Cards;