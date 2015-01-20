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
  renderComplete:function(){
    var markup = this.props.complete + "%";
    if(this.props.funds > 0 && this.props.funds < this.props.goal ){
      markup += " ("+accounting.formatMoney(this.props.funds,{precision:0})+")"
    }
    return markup;
  },
  render:function(){

    // user contribution is rendered behind the complete style so we need to adjust the width accordingly
    var completeStyle         = {width:(this.props.complete - this.props.currentUserContribution) + "%"};
    var userContributionStyle = {width:(this.props.complete) + "%"};

    return (
        <div className="invest-card-progress-bar-wrapper">
          <div className="invest-card-progress-bar-details-balance">
            <div className="invest-card-progress-bar-details-complete">
              {this.renderComplete() }
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