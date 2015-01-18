'use strict';

var React = require('react');
var mui   = require('material-ui');
var Button   = mui.FlatButton;
var actions =  require('../actions/InvestCardActions');
var status = require('../constants/AppConstants').CardStatus;
var API = require('../utilities/InvestmentCardAPI');
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
            <Button label="OPEN" secondary={true} onClick={function(){actions.updateStatus(status.OPEN)}} />

          </section>

        </div>
    );
  }

});

module.exports = Controls;