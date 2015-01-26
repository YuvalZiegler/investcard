var expect = require('chai').expect;

var CardStatus =  require('../../src/js/constants/AppConstants.js').CardStatus;

describe('InvestmentCard', function() {
  var React = require('react/addons');
  var InvestmentCard = require('../../src/js/components/invest-card/InvestmentCard.react.jsx');
  var TestUtils = React.addons.TestUtils;
  var card;
  
  describe('InvestmentCard Component', function(){
    describe('Deafult state', function(){
      card  = TestUtils.renderIntoDocument( <InvestmentCard/> );
      it('should mount', function() {
        expect(card.isMounted()).to.be.true;
      });
      it('id is -1', function() {
        expect( card.props.id).to.be.eql(-1);
      });
      it('status is LOADING', function() {
        expect( card.props.status).to.be.eql(CardStatus.LOADING);
      });
    })
  });

});

