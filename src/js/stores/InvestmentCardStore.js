'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');
var CHANGE_EVENT = 'change';
var ActionTypes = require('../constants/AppConstants').ActionTypes;
var _state = {};

var InvestmentCardStore = objectAssign( EventEmitter.prototype, {

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
  addFunds:function(amount){
    _state.currentFunds= parseInt(_state.currentFunds) + parseInt(amount);
    return this;
  },
  setState:function(state){
    _state = state;
    return this;
  }
});


InvestmentCardStore.dispatchToken = AppDispatcher.register(function(payload) {
  

  console.log("❤ ︎ STORE      :: " +  payload.source + " :: " + payload.action.type);

  var action = payload.action;
  // handles both server and view actions since we don't can be split to consider source when needed.
  switch(action.type) {
    case ActionTypes.RECEIVE_INITIAL_STATE:
      InvestmentCardStore.setState(JSON.parse(action.payload)).emitChange();
      break;
    case ActionTypes.ADD_FUNDS:
      InvestmentCardStore.addFunds(action.payload).emitChange();
      break;
    default:
      // do nothing
  }
  
  InvestmentCardStore.emitChange();

});


module.exports = InvestmentCardStore;