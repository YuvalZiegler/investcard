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
  }

};

module.exports = InvestmentCardActions;