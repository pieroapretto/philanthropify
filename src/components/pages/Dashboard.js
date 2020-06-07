import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../../actions/user';

const DashboardPage = ({ name, startLogout }) => (
    <div>
        <p>Logged in as {name}!</p>
        <button onClick={startLogout}>Logout</button>
    </div>
);

const mapStateToProps = state => ({
    name: state.user.name
});

const mapDispatchToProps = dispatch => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);