var Actions = require('../actions/InvestCardActions');
var React = require('react/addons');
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
    goal:React.PropTypes.string,
    date:React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      id:1
    };
  },


  render: function () {
    return <div className="InvestmentCard"></div>
  }

});

module.exports = InvestmentCard;



