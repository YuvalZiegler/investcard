'use strict';

var AppDispatcher  = require('../dispatcher/AppDispatcher');
var EventEmitter   = require('events').EventEmitter;
var objectAssign   = require('react/lib/Object.assign');
var CHANGE_EVENT   = 'change';
var Actions        = require('../constants/AppConstants');
var ActionsSources = Actions.ActionSources;
var ActionTypes    = Actions.ActionTypes;
var CardStatus     = Actions.CardStatus;
var find           = require('lodash.find');
var _state = {};

var InvestmentCardStore = objectAssign({} ,EventEmitter.prototype, {
  findCard:function(id){
    return find( _state.cards , function(card){
      return id === card.id
    });
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  getState: function() {
    return _state;
  },
  addFunds:function(options, source){
    var card = this.findCard(options.id)
    var amount = options.amount;
    // we make sure we can't go over the limit
    var computedFunds = Math.min( parseInt(card.currentFunds) + parseInt(amount), card.fundingGoal );
    // if the card is pending or funded just return
    if (card.status === CardStatus.PENDING ||  card.status === CardStatus.FUNDED){
      return this;
    }
    // if we reached the limit close card
    if(computedFunds === card.fundingGoal){
      card.status = CardStatus.FUNDED;
    }
    // if the user initiated investment five him credit and change the status to invested
    if (source === ActionsSources.VIEW_ACTION){
      card.currentUserContribution= parseInt(amount);
      computedFunds === card.fundingGoal ? card.status = CardStatus.FUNDED : card.status = CardStatus.INVESTED;
    }

    this.addInvestor(card);
    card.currentFunds = computedFunds;
    return this;
  },
  addInvestor:function(card){
    card.investors++;
    return this;
  },
  setStatus:function(options){
    var result = this.findCard(options.id)
    if(result) result.status = options.status
    return this;
  },
  setState:function(state){
    _state = state;
    return this;
  }
});


InvestmentCardStore.dispatchToken = AppDispatcher.register(function(payload) {
  var message = "❤ ︎ STORE      :: " +  payload.source + " :: " + payload.action.type;
  var action = payload.action;

  // handles both server and view actions since we don't can be split to consider source when needed.
  switch(action.type) {

    case ActionTypes.RECEIVE_INITIAL_STATE:
      InvestmentCardStore.setState(JSON.parse(action.payload)).emitChange();
      break;

    case ActionTypes.ADD_FUNDS:
      InvestmentCardStore
          .addFunds(action.payload, payload.source)
          .emitChange();
      break;

    case ActionTypes.UPDATE_STATUS:
        InvestmentCardStore
          .setStatus(action.payload)
          .emitChange();
      break;

    default:
      message = undefined;
      // do nothing
  }

  if (message) console.log(message);
});


module.exports = InvestmentCardStore;