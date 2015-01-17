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
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_STATE,
      payload: payload
    });
  },
  addFunds: function(amount) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ADD_FUNDS,
      payload:amount
    });
  }

};

module.exports = InvestmentCardActions;