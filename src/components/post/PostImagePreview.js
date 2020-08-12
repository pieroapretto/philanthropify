import React from 'react';
import { Card } from 'react-bootstrap';

const PostImagePreview = ({ imagePreview, removeImagePreview }) => {
    return (
        <Card style={{ width: '100%' }}>
            <div className="post-preview-close" onClick={removeImagePreview}>X</div>
            <Card.Img variant="top" className="profile-post-preview-image" src={imagePreview} />
        </Card>
    );
}

export default PostImagePreview;