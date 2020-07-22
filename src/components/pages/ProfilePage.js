import React from 'react';
import { connect } from 'react-redux';
import ProfileHeader from '../profile/ProfileHeader';
import PostForm from '../post/PostForm';

const ProfilePage = ({ bannerPhoto }) => (
    <div id="profile_dashboard">
        <div className="container">
            <div className="row">
                <div className="col">
                    <img id="profile-banner-img" src={bannerPhoto}/>
                </div>
            </div>
            <ProfileHeader/>
            <PostForm/>
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

export default connect(mapStateToProps, null)(ProfilePage);