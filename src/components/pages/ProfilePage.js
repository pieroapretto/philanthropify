import React from 'react';
import { connect } from 'react-redux';
import ProfileHeader from '../profile/ProfileHeader';
import ProfileForm from '../profile/ProfileForm';

const ProfilePage = ({ bannerPhoto }) => (
    <div id="profile_dashboard">
        <div className="container">
            <div className="row">
                <div className="col">
                    <img id="profile-banner-img" src={bannerPhoto}/>
                </div>
            </div>
            <ProfileHeader/>
            <ProfileForm/>
            <div className="row">
                <div className="col">
                    <div className="profile-user-posts">
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({
    bannerPhoto: state.user.bannerPhoto
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);