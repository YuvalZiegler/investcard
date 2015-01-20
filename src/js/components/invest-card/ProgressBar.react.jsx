var React = require('react');
var accounting = require('accounting');
var actions = require('../../actions/NotificationActions');

var ProgressBar = React.createClass({
  getDefaultProps:function(){
    return {
      goal:0,
      complete:0,
      funds:0,
      currentUserContribution:0,
      investors:0
    }
  },

  render:function(){

    // user contribution is rendered behind the complete style so we need to adjust the width accordingly
    var completeStyle         = {width:(this.props.complete - this.props.currentUserContribution) + "%"};
    var userContributionStyle = {width:(this.props.complete) + "%"};

    return (
        <div className="invest-card-progress-bar-wrapper">
          <div className="invest-card-progress-bar-details-balance">
            <div className="invest-card-progress-bar-details-complete">
              {this.props.complete + "% ("+accounting.formatMoney(this.props.funds,{precision:0})+")" }
              <br/>
              funded by &nbsp;
              <a className="view-investors" onClick={ actions.showMessage.bind(this, "feature not implemented: will show investors list") }>
                {this.props.investors} investors
              </a>
            </div>
          </div>
          <div className="invest-card-progress-bar-details-goal">
              {accounting.formatMoney(this.props.goal,{precision: 0})}
              <br/>
              goal
          </div>
          <div className="invest-card-progress-bar">
            <div className="invest-card-progress-bar-user-contribution" style={userContributionStyle}></div>
            <div className="invest-card-progress-bar-complete" style={completeStyle}></div>
          </div>
        </div>
    );
  }
});

module.exports = ProgressBar;