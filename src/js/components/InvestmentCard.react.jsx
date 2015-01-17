var React = require('react')
var InvestForm = require('./InvestForm.react.jsx');
var ProgressBar = require('./ProgressBar.react.jsx');
var CardStatus = require('../constants/AppConstants').CardStatus;

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
    date:React.PropTypes.string
  },
  renderInvestedState:function(){
      return (
          <div className="investment-card-invested-state">
            <div>your investment:</div>
          </div>
      )
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
  render: function () {
    var p = this.props;
    var calculatedCeiling = p.fundingGoal-p.currentFunds;
    return (
      <div className="investment-card" key={p.id}>
        <div className="investment-card_image-wrapper">
            <img src={p.companyLogo}/>
        </div>
        <div className="investment-card_text-wrapper">
            <h1 className="mui-font-style-title">{p.companyTitle}</h1>
            <h2 className="mui-font-style-subhead-2">{p.companyExcerpt}</h2>
            <p className="mui-font-style-body-1">{p.companyDescription}</p>
            {
                (p.status === CardStatus.OPEN) ? <InvestForm ceiling={calculatedCeiling}/> :
                (p.status === CardStatus.INVESTED) ? this.renderInvestedState() : undefined
            }
            {  (p.status === CardStatus.OPEN || p.status === CardStatus.INVESTED || CardStatus.FUNDED ) ?
                this.renderProgressBar() : undefined }
         </div>
      </div>
    )
  }

});

module.exports = InvestmentCard;



