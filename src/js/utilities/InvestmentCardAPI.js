'use strict';

var InvestmentCardStartingData = require('../fixtures/InvestmentCardStartingData');
var actions = require('../actions/InvestCardActions');

module.exports = {
  init:function(){
     var payload = JSON.stringify(InvestmentCardStartingData);
    actions.initialize(payload);
  }
};


