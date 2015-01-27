var React = require('react');
var InvestForm = require('./InvestForm.react.jsx');
var ProgressBar = require('./ProgressBar.react.jsx');
var CardStatus = require('../../constants/AppConstants').CardStatus;
var accounting = require('accounting');
var actions = require('../../actions/NotificationActions');
var IconButton = require('material-ui').IconButton;
var elementIsInViewport = require('../../utilities/DOMUtilities').isInViewport;
var throttleTimeout;
var InvestmentCard = React.createClass({
  // A list of properties we expect and their types

  propTypes:{
    id: React.PropTypes.number.isRequired,
    companyTitle: React.PropTypes.string,
    companyLogo: React.PropTypes.string,
    companyExcerpt:React.PropTypes.string,
    companyDescription: React.PropTypes.string,
    status: React.PropTypes.oneOf([
      CardStatus.LOADING, CardStatus.PENDING, CardStatus.OPEN, CardStatus.INVESTED, CardStatus.FUNDED
    ]),
    fundingGoal:React.PropTypes.number,
    currentFunds:React.PropTypes.number,
    currentUserContribution:React.PropTypes.number,
    investors:React.PropTypes.number,
    fundingStart:React.PropTypes.string,
    timeFromNow:React.PropTypes.string
  },
  getDefaultProps:function(){
    return {
      status: CardStatus.LOADING,
      id:-1
    }
  },
  // render functions for various states of the card
  renderPendingState:function(){
    return (

        <div className="investment-card-pending-state fade-in">
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
    return (<InvestForm ref="investmentForm" ceiling={calculatedCeiling} id={this.props.id}/>)
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
    return (
        <div className="investment-card-funded-state fade-in">
          <p className="mui-font-style-body-2">funding goal reached!</p>
          <h3 className="mui-font-style-display-2">{accounting.formatMoney(this.props.fundingGoal,{precision:0})}</h3>
          { this.props.currentUserContribution > 0 ? this.renderUserInvestment() : null }
        </div>
    );
  },
  renderUserInvestment: function(){
    return (
        <div>
          <p className="mui-font-style-caption">Your Investment:</p>
          <h4 className="mui-font-style-display-1">{ accounting.formatMoney(this.props.currentUserContribution,{precision:0})}</h4>
        </div>
    )

  },
  renderBanner: function(){
    var banner;
    var p = this.props;
    if  (p.status === CardStatus.PENDING || this.props.status === CardStatus.LOADING) return;
    if  (p.status === CardStatus.OPEN || p.status === CardStatus.INVESTED) {
      banner = "open";
    } else if (p.status === CardStatus.FUNDED) {
      banner = "funded";
    }
    return (<div className={"zoom-in banner " + banner}>{banner}</div>)
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
            funds={p.currentFunds}/>
    );
  },
  // The main render function for the card
  render: function () {
    var p = this.props;

    return (
      <div className={"investment-card " + p.status} 
           key={p.id} 
           onMouseEnter={this._onMouseEnter}
           onMouseLeave={this._onMouseLeave}
            >
        {this.renderBanner()}
        <div className="investment-card_image-wrapper">
            <img src={p.companyLogo}/>
        </div>
        <div className="investment-card_text-wrapper">
            <div className="companyDetails">
              <h1 className="mui-font-style-title">
                {p.companyTitle}
              </h1>
              <h2 className="mui-font-style-subhead-2">{p.companyExcerpt}</h2>
              <p className="mui-font-style-body-1">{p.companyDescription}</p>
            </div>
            {
                (p.status === CardStatus.PENDING) ? this.renderPendingState() :
                (p.status === CardStatus.OPEN) ? this.renderOpenState() :
                (p.status === CardStatus.INVESTED) ? this.renderInvestedState() :
                (p.status === CardStatus.FUNDED) ? this.renderFundedState() : null
            }
            { this.props.status !== CardStatus.PENDING &&
              this.props.status !== CardStatus.LOADING  ? this.renderProgressBar() : null }
         </div>
      </div>
    )
  },
  _elementIsInViewport:elementIsInViewport,
  _onMouseEnter:function(){
    // return early if card is not in the open state
    if(this.props.status !==CardStatus.OPEN) return;
    // do not focus unless mouse stays on card
    throttleTimeout = setTimeout(function(){
      // check if the form is in the view to prevent the browser scrolling to a new position
      var form  = this.refs.investmentForm;
      if(this._elementIsInViewport(form.getDOMNode())){
        form.refs.investInput.focus();
      }
     }.bind(this),250);
   
  },
  _onMouseLeave:function(){
    if(this.props.status !==CardStatus.OPEN) return;
    clearTimeout(throttleTimeout);
    // this.refs.investmentForm.refs.investInput.blur();
  }
});

module.exports = InvestmentCard;



