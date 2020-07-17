import React from 'react';
import { connect } from 'react-redux';

const AccountPage = ({ name, photo, startLogout }) => (
    <div id="account_dashboard">
        <div className="container">
            <div className="row">
                <p>Logged in as {name}!</p>
                <img className="profile-pic" src={photo}/>
                <button onClick={startLogout}>Logout</button>
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({
    name: state.user.displayName,
    photo: state.user.profilePhoto
});

const mapDispatchToProps = dispatch => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);