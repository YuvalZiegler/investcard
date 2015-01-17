var React = require('react')

var InvestForm = require('./InvestForm.react.jsx');
var States = require('../constants/AppConstants').CardStates;

var InvestmentCard = React.createClass({

  propTypes:{
    id: React.PropTypes.number,
    companyTitle: React.PropTypes.string,
    companyLogo: React.PropTypes.string,
    companyExcerpt:React.PropTypes.string,
    companyDescription: React.PropTypes.string,
    state: React.PropTypes.oneOf([
      States.PENDING, States.OPEN, States.INVESTED, States.FUNDED
    ]),
    fundingGoal:React.PropTypes.number,
    currentFunds:React.PropTypes.number,
    users:React.PropTypes.string,
    date:React.PropTypes.string
  },


  render: function () {
    p = this.props;
    return (
      <div className="investment-card" key={p.id}>
        <div className="investment-card_image-wrapper">
            <img src={p.companyLogo}/>
        </div>
        <div className="investment-card_text-wrapper">
            <h1 className="mui-font-style-title">{p.companyTitle}</h1>
            <h2 className="mui-font-style-subhead-2">{p.companyExcerpt}</h2>
            <p className="mui-font-style-body-1">{p.companyDescription}</p>
            { p.state === States.OPEN ? <InvestForm/>  : ""}
         </div>
      </div>
    )
  }

});

module.exports = InvestmentCard;



