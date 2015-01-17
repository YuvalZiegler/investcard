var Actions = require('../actions/InvestCardActions');
var mui = require('material-ui');
var accounting = require('accounting');
var React = require('react');
var Button = mui.RaisedButton;
var Input = mui.Input;


var InvestForm = React.createClass({
  propTypes:{
    // we require maximum value for investment
    ceiling:React.PropTypes.number.isRequired
  },
  getInitialState:function(){
    return {
      submitable:false,
      submitted:false
    }

  },
  _handleSubmit:function(e){
    e.preventDefault();
    // Return early if the form has already been submitted
    if (this.state.submitted) return;
    // convert the formatted value back to an integer then send the action
    var investment = accounting.unformat(this.refs.investInput.state.value);
    Actions.addFunds(investment);
    // set state to submitted to prevent multiple submissions

    this.isMounted() ? this.setState({submitted:true}) : undefined;
  },
  // Handles the input field converting numbers to formatted currency
  _handleInput:function(){

    var rawNumber = accounting.unformat(event.target.value);

    if (rawNumber > this.props.ceiling) rawNumber = this.props.ceiling;
    // when the input is valid and larger than 0 we allow submissions
    this.setState( { submitable: (rawNumber>0) } );
    // format the value and display it in the input field
    var formattedValue = accounting.formatMoney(rawNumber,{precision: 0});
    this.refs.investInput.setValue(formattedValue);

  },
  render:function(){

    return(
        <form className="invest-form" onSubmit={this._handleSubmit} >
          <Input ref="investInput"
                 type="text"
                 name="investInput"
                 placeholder="Investment amount"
                 description={"Enter $ amount up to " +  accounting.formatMoney(this.props.ceiling,{precision: 0})}
                 onChange={this._handleInput}/>

          <div className="invest-button-wrapper">
            <Button label="invest" primary={true} disabled={!this.state.submitable} />
          </div>
        </form>
    );
  }

});

module.exports = InvestForm;