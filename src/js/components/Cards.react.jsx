'use strict';

var InvestmentCardStore = require('../stores/InvestmentCardStore');
var InvestmentCard      = require('./invest-card/InvestmentCard.react.jsx');
var React               = require('react');

function getStateFromStores() {
  return  InvestmentCardStore.getState();
}

var Cards = React.createClass({

  getInitialState:function(){
    return { cards:[] }
  },

  render: function() {

    return (
        <div className="cards">
        {this.state.cards.map( function(card, index){ return <InvestmentCard key={index} {...card} /> } )}
       </div>
    );
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