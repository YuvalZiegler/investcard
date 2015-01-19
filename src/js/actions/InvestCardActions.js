'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AppConstants').ActionTypes;

var InvestmentCardActions = {
  initialize:function(payload){
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_INITIAL_STATE,
      payload: payload
    });
  },
  updateState: function (payload) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.UPDATE_STATE,
      payload: payload
    });
  },
  updateStatus: function(payload) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_STATUS,
      payload: payload
    });
  },
  addFunds: function(payload) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ADD_FUNDS,
      payload:payload
    });
  },
  simulateServerInvestment:function(payload){
    AppDispatcher.handleServerAction({
      type: ActionTypes.ADD_FUNDS,
      payload:payload
    });
  }

};

module.exports = InvestmentCardActions;