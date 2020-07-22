import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

const ProfileHeader = ({ displayName, userName, avatarPhoto, aboutMe }) => {
    return (
        <div id="profile-header-content">
            <div className="row">
                <div className="col-8">
                    <div className="profile-header-info">
                        <img className="profile-avatar-img" src={avatarPhoto}/>
                        <h4 className="profile-display-name">{displayName}</h4>
                        <div className="profile-user-name">@{userName}</div>
                        <div className="profile-about-me">{aboutMe}</div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="profile-header-options">
                        <Button variant="secondary" size="sm">Edit Profile</Button>
                        <Button variant="primary" size="sm">Share</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    avatarPhoto: state.user.avatarPhoto,
    displayName: state.user.displayName,
    userName: state.user.userName,
    aboutMe: state.user.aboutMe
});

export default connect(mapStateToProps, null)(ProfileHeader);
