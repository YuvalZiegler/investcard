var React = require('react');
var InvestForm = require('./InvestForm.react.jsx');
var ProgressBar = require('./ProgressBar.react.jsx');
var CardStatus = require('../../constants/AppConstants').CardStatus;
var accounting = require('accounting');
var actions = require('../../actions/NotificationActions');
var IconButton = require('material-ui').IconButton;

var InvestmentCard = React.createClass({
  // A list of properties we expect and their types
  propTypes:{
    id: React.PropTypes.number,
    companyTitle: React.PropTypes.string,
    companyLogo: React.PropTypes.string,
    companyExcerpt:React.PropTypes.string,
    companyDescription: React.PropTypes.string,
    status: React.PropTypes.oneOf([
      CardStatus.PENDING, CardStatus.OPEN, CardStatus.INVESTED, CardStatus.FUNDED
    ]),
    fundingGoal:React.PropTypes.number,
    currentFunds:React.PropTypes.number,
    currentUserContribution:React.PropTypes.number,
    investors:React.PropTypes.number,
    fundingStart:React.PropTypes.string,
    timeFromNow:React.PropTypes.string
  },
  // render functions for various states of the card
  renderPendingState:function(){
    return (

        <div className="investment-card-pending-state">
          <p className="mui-font-style-body-2">funding goal</p>
          <h3 className="mui-font-style-display-1">{accounting.formatMoney(this.props.fundingGoal,{precision:0})}</h3>
          <h4 className="mui-font-style-title">Starts {this.props.fundingStart}</h4>
          <p className="mui-font-style-caption">{this.props.timeFromNow}</p>
          <IconButton icon="action-alarm" onClick={  actions.showMessage.bind(undefined, "remind me feature is not implemented") }/>
          <p className="mui-font-style-body-2 remind-me-label">remind me!</p>
        </div>

    );
  },
  renderOpenState:function(){
    var p = this.props;
    var calculatedCeiling = p.fundingGoal-p.currentFunds;
    return (<InvestForm ceiling={calculatedCeiling}/>)
  },
  renderInvestedState:function(){

      return (
          <div className="investment-card-invested-state fade-in">
            <h3 className="mui-font-style-title">your investment:</h3>
            <h4 className="mui-font-style-display-1">{accounting.formatMoney(this.props.currentUserContribution,{precision:0})}</h4>
          </div>
      )
  },
  renderFundedState:function(){
    return (<div className="investment-card-funded-state fade-in">
      <p className="mui-font-style-body-2">funding goal reached!</p>
      <h3 className="mui-font-style-display-2">{accounting.formatMoney(this.props.fundingGoal,{precision:0})}</h3>
      <p className="mui-font-style-caption">You Invested:</p>
      <h4 className="mui-font-style-display-1">{accounting.formatMoney(this.props.currentUserContribution,{precision:0})}</h4>

    </div>);
  },
  renderProgressBar:function(){

    var p = this.props;
    var fundedPercentage = Math.round(p.currentFunds/p.fundingGoal * 100);
    var UserContributionPercentage = Math.round(p.currentUserContribution/p.fundingGoal * 100);

    return (
        <ProgressBar investors={p.investors}
            complete={fundedPercentage}
            currentUserContribution={UserContributionPercentage}
            goal={p.fundingGoal}
        />
    )
  },
  // The main render function for the card
  render: function () {
    var p = this.props;

    return (
      <div className={"investment-card fade-in " + p.status} key={p.id}>
        <div className="investment-card_image-wrapper">
            <img src={p.companyLogo}/>
        </div>
        <div className="investment-card_text-wrapper">
            <h1 className="mui-font-style-title">
              {p.companyTitle}
            </h1>
            <h2 className="mui-font-style-subhead-2">{p.companyExcerpt}</h2>
            <p className="mui-font-style-body-1">{p.companyDescription}</p>
            {
                (p.status === CardStatus.PENDING) ? this.renderPendingState() :
                (p.status === CardStatus.OPEN) ? this.renderOpenState() :
                (p.status === CardStatus.INVESTED) ? this.renderInvestedState() :
                (p.status === CardStatus.FUNDED) ? this.renderFundedState() : null
            }
            { this.props.status !== CardStatus.PENDING ? this.renderProgressBar() : null }
         </div>
      </div>
    )
  }

});

module.exports = InvestmentCard;



