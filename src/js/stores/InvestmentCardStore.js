'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var objectAssign  = require('react/lib/Object.assign');
var CHANGE_EVENT  = 'change';
var Actions       = require('../constants/AppConstants');
var ActionsSources= Actions.ActionSources;
var ActionTypes   = Actions.ActionTypes;
var CardStatus    = Actions.CardStatus;
var _state = {};

var InvestmentCardStore = objectAssign({} ,EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  getValue: function(key) {
    return _state[key];
  },
  getState: function() {
    return _state;
  },
  addFunds:function(amount, source){
    // we make sure we can't go over the limit
    var computedFunds = Math.min(parseInt(_state.currentFunds) + parseInt(amount), _state.fundingGoal);
    // if the card is pending or funded just return
    if (_state.status === CardStatus.PENDING ||  _state.status === CardStatus.FUNDED){
      return this;
    }
    // if we reached the limit close card
    if(computedFunds === _state.fundingGoal){
      this.setStatus(CardStatus.FUNDED);
    }
    // if the user initiated investment five him credit and change the status to invested
    if (source === ActionsSources.VIEW_ACTION){
      _state.currentUserContribution= parseInt(amount);
      computedFunds === _state.fundingGoal ? this.setStatus(CardStatus.FUNDED) : this.setStatus(CardStatus.INVESTED);
    }
    this.addInvestor();

    _state.currentFunds = computedFunds;
    return this;
  },
  addInvestor:function(){
    _state.investors++;
    return this;
  },
  setStatus:function(status){
    _state.status = status;
    return this;
  },
  setState:function(state){
    _state = state;
    return this;
  }
});


InvestmentCardStore.dispatchToken = AppDispatcher.register(function(payload) {

  var action = payload.action;
  // handles both server and view actions since we don't can be split to consider source when needed.
  switch(action.type) {

    case ActionTypes.RECEIVE_INITIAL_STATE:
      console.log("❤ ︎ STORE      :: " +  payload.source + " :: " + payload.action.type);
      InvestmentCardStore.setState(JSON.parse(action.payload)).emitChange();
      break;

    case ActionTypes.ADD_FUNDS:
      console.log("❤ ︎ STORE      :: " +  payload.source + " :: " + payload.action.type);
      InvestmentCardStore
          .addFunds(action.payload, payload.source)
          .emitChange();
      break;
    case ActionTypes.UPDATE_STATUS:
        console.log("❤ ︎ STORE      :: " +  payload.source + " :: " + payload.action.type);
        InvestmentCardStore
          .setStatus(action.payload)
          .emitChange();
      break;

    default:
      // do nothing
  }

});


module.exports = InvestmentCardStore;