var Actions = require('../actions/InvestCardActions');

var React = require('react')
var mui = require('material-ui');
var Button = mui.RaisedButton;
var Input = mui.Input;

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
    fundingGoal:React.PropTypes.string,
    currentFunds:React.PropTypes.string,
    users:React.PropTypes.string,
    date:React.PropTypes.string
  },
  investmentInputHandler:function(e,value){

  },
  getForm:function(){
    return (<form className="invest-form">
      <Input ref="investment" type="text" name="investment" placeholder="Investment amount" description="Enter $ amount" onChange={this.investmentInputHandler}/>
      <div className="invest-button-wrapper">
        <Button label="invest" primary={true} disabled={true}/>
      </div>
    </form>)
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
            { p.state === States.OPEN ? this.getForm() : ""}
         </div>
      </div>
    )
  }

});



module.exports = InvestmentCard;



