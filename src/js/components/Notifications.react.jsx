'use strict';

var NotificationStore = require('../stores/NotificationStore');
var React = require('react');
var Snackbar = require('material-ui').Snackbar;

function getStateFromStores() {
    return NotificationStore.getState();
}
var Notification = React.createClass({


    getInitialState:function(){
        return {message:""};
    },

    render: function() {

        return (
            <div>
                <Snackbar ref="notification" message={this.state.message} action="Dismiss" onActionTouchTap={this._onDismiss}/>
            </div>
        )
    },

    componentDidMount: function () {

        NotificationStore.addChangeListener(this._onChange);
    },
    _onDismiss:function(){

        this.refs.notification.dismiss();
    },

    _onChange: function () {
        var state =   getStateFromStores();
        console.log("☯ Notification:: STATE UPDATE" );
        this.setState(state);
        this.refs.notification.show();
    }

});

module.exports = Notification;