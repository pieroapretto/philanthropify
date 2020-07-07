import React from 'React';
import { Button } from 'react-bootstrap';
import { getOAuthLink } from '../../actions/stripe';
import { connect } from 'react-redux';

const ConnectAccountButton = () => {
    return (
        <Button id="connect-account-btn" onClick={getOAuthLink}>Connect Account To Stripe</Button>
    );
}

const mapDispatchToProps = dispatch => ({
    getOAuthLink: () => dispatch(getOAuthLink())
});

export default connect(null, mapDispatchToProps)(ConnectAccountButton);