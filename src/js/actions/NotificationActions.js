'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/AppConstants').ActionTypes;

var MessagingActions = {

  showMessage:function(payload){
    AppDispatcher.handleServerAction({
      type: ActionTypes.SHOW_MESSAGE,
      payload: payload
    });
  }


};

module.exports = MessagingActions;