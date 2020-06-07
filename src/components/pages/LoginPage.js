import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin } from '../../actions/user';

const LoginPage = ({ googleLogin }) => (
    <div>
        <button onClick={googleLogin}>Google Login</button>
    </div>
);

const mapDispatchToProps = dispatch => ({
    googleLogin: () => dispatch(startGoogleLogin())
});

export default connect(null, mapDispatchToProps)(LoginPage);
