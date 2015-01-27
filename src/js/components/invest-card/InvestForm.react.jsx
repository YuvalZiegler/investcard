var Actions = require('../../actions/InvestCardActions');
var accounting = require('accounting');
var React = require('react');
var mui = require('material-ui');
var Button = mui.RaisedButton;
var Input = mui.Input;


var InvestForm = React.createClass({
  propTypes:{
    // we require maximum value for investment
    ceiling : React.PropTypes.number.isRequired,
    id      : React.PropTypes.number.isRequired
  },
  getInitialState:function(){
    return {
      submittable :false,
      submitted   :false,
    }

  },
  _handleSubmit:function(e){
    e.preventDefault();
    // Return early if the form has already been submitted
    if (this.state.submitted) return;
    // convert the formatted value back to an integer then send the action
    var investment = accounting.unformat(this.refs.investInput.state.value);
    investment = Math.min(investment,this.props.ceiling)
    Actions.addFunds({amount:investment,id:this.props.id});
    // set state to submitted to prevent multiple submissions

    this.isMounted() ? this.setState({submitted:true}) : undefined;
  },
  // Handles the input field converting numbers to formatted currency
  _handleInput:function(){
    // convert value back to number
    var rawNumber = accounting.unformat(event.target.value);
    // make sure we are not over the max value
    rawNumber =  Math.min(rawNumber,this.props.ceiling);
    // when the input is valid and larger than 0 we allow submissions
    this.setState( { submittable: (rawNumber>0) } );
    // format the value and display it in the input field
    var formattedValue = rawNumber === 0 ? "$" : accounting.formatMoney(rawNumber,{precision: 0});
    this.refs.investInput.setValue(formattedValue);

  },
  render:function(){

    return(
        <form className="invest-form fade-in" onSubmit={this._handleSubmit} >
          <Input ref="investInput"
                 type="text"
                 name="investInput"
                 placeholder="Enter Investment amount"
                 description={"$ amount up to " +  accounting.formatMoney(this.props.ceiling,{precision: 0})}
                 onChange={this._handleInput}/>

          <div className="invest-button-wrapper">
            <Button label="invest" primary={true} disabled={!this.state.submittable} />
          </div>
        </form>
    );
  }

});

module.exports = InvestForm;