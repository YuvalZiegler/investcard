'use strict';

var React     = require('react');
var mui       = require('material-ui');
var Button    = mui.FlatButton;
var actions   = require('../actions/InvestCardActions');
var status    = require('../constants/AppConstants').CardStatus;
var API       = require('../utilities/InvestmentCardAPI');
var CardStore = require('../stores/investmentCardStore');

var Controls = React.createClass({
  render: function() {
    return (
        <div className="controls">
          <header>
            <h1 className="mui-font-style-title">CONTROLS</h1>
          </header>

          <section>
            <p className="mui-font-style-title">Set Card State</p>
            <Button label="RESET" secondary={true} onClick={function(){API.init()}} />
            <Button label="OPEN"  secondary={true} onClick={function(){actions.updateStatus(status.OPEN)}} />
            <p className="mui-font-style-caption">
              *For demonstration purpose an open card will have 15 investors and $40,000
            </p>
          </section>
          
          <section>
            <p className="mui-font-style-title">Simulate transaction</p>
            <Button label="Add investment" secondary={true} onClick={function(){actions.simulateServerInvestment(10000)}} />
            <p className="mui-font-style-caption">Use this to simulate another person investing $10,000</p>
          </section>
        
        </div>
    );
  }

});

module.exports = Controls;