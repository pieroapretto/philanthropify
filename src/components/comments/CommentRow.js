import React from 'react';
import { connect } from 'react-redux';

const Post = (post) => {

    return (
        <div className="post">
            <div className="row">
                <div className="col">
                    <ProfileIcon/>
                    <ProfileName/>
                    <div>{post.timestamp}</div>
                    <HamburgerMenu/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <PostText/>
                    <PostCategories/>
                    <PostContent/>
                </div>
            </div>
            <div className="row">
                
                <div className="col">
                    <PostToolBar/>
                    <div>{post.like_count}</div>
                    <PostComments/>
                </div>
            </div>
        </div>
    );
};

export default connect()(Post);