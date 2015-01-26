'use strict';

var React     = require('react');
var mui       = require('material-ui');
var Button    = mui.FlatButton;
var DropDown  = mui.DropDownMenu;
var actions   = require('../actions/InvestCardActions');
var status    = require('../constants/AppConstants').CardStatus;
var API       = require('../utilities/InvestmentCardAPI');
var CardStore = require('../stores/investmentCardStore');

function getStateFromStore(){
  return CardStore.getState();
}
var Controls = React.createClass({
  getInitialState:function(){
    return {cards:[],selected:1}
  },
  _onChange:function(){
    this.setState(getStateFromStore());
  },
  _onCardSelect:function(e, selectedIndex, menuItem){

    this.setState( {selected: menuItem.payload} );
  },
  componentDidMount:function(){
    CardStore.addChangeListener(this._onChange);
  },

  render: function() {
    var menuItems = [];
    if (this.state.cards){
      menuItems = this.state.cards.map(function(card){ return {payload:card.id, text:card.companyTitle }})
    }
    var selected = this.state.selected;
    return (

        <div className="controls">
          <header className="mui-toolbar">
            <div className="mui-toolbar-group mui-right">
              <Button label="RESET ALL" primary={true} onClick={function(){API.init()}} />
            </div>
            <h1 className="mui-font-style-title">CONTROLS</h1>
          </header>

          <section>
            <p className="mui-font-style-title">{ menuItems.length ? <DropDown menuItems={menuItems} onChange={this._onCardSelect}/> : undefined }</p>
            
            <Button label="OPEN"  secondary={true} onClick={function(){ actions.updateStatus({status:status.OPEN, id: selected })} } />
            <Button label="Add investment*" secondary={true} onClick={function(){actions.simulateServerInvestment({id:selected,amount:10000})}} />
            <p className="mui-font-style-caption">*Use this to simulate another person investing $10,000</p>
          </section>
                
        </div>
    );
  }

});

module.exports = Controls;