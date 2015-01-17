var Actions = require('../actions/InvestCardActions');
var mui = require('material-ui');
var accounting = require('accounting');
var React = require('react');
var Button = mui.RaisedButton;
var Input = mui.Input;


var InvestForm = React.createClass({
  getInitialState:function(){
    return {
      submitable:false,
      submitted:false
    }

  },
  _handleSubmit:function(e){
    e.preventDefault();
    if (this.state.submitted) return;
    var investment = accounting.unformat(this.refs.investInput.state.value);
    Actions.addFunds(investment);
    this.setState({submitted:true})
  },
  _handleInput:function(){

    var rawNumber = accounting.unformat(event.target.value);
    this.setState( { submitable: (rawNumber>0) } );
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
                 description="Enter $ amount"
                 onChange={this._handleInput}/>

          <div className="invest-button-wrapper">
            <Button label="invest" primary={true} disabled={!this.state.submitable} />
          </div>
        </form>
    );
  }

});

module.exports = InvestForm;