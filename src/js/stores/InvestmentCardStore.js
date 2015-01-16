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

  getVal: function(key) {
    return _state[key];
  },

  getState: function() {
    return _state;
  }

});


InvestmentCardStore.dispatchToken = AppDispatcher.register(function(payload) {
  
  console.log("❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤");
  console.log("❤ ︎ STORE      :: " +  payload.source + " :: " + payload.action.type);
  console.log("❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤");
  
  var action = payload.action;
  
  switch(action.type) {
    case ActionTypes.RECEIVE_INITIAL_STATE:
    case ActionTypes.UPDATE_STATE:
      _state = objectAssign( _state, action.payload );
      InvestmentCardStore.emitChange();
      break;

    default:
      // do nothing
  }
  
  InvestmentCardStore.emitChange();

});


module.exports = InvestmentCardStore;