'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var objectAssign  = require('react/lib/Object.assign');
var CHANGE_EVENT  = 'change';
var Actions       = require('../constants/AppConstants');
var ActionTypes   = Actions.ActionTypes;

var _notifications={};

var NotificationStore = objectAssign({} ,EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT, _notifications);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  setMessage:function(msg){
    _notifications = { message:msg };
    return this;
  },
  getState:function(){
    return _notifications;
  }
});


NotificationStore.dispatchToken = AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.type) {
    case ActionTypes.SHOW_MESSAGE:
      console.log("❤ ︎ NOTIFICATION STORE :: " +  payload.source + " :: " + payload.action.type );
      NotificationStore.setMessage( payload.action.payload ).emitChange();
      break;
    default:
    // do nothing
  }

});


module.exports = NotificationStore;