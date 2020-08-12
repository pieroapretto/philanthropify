import React from 'react';
import { Card } from 'react-bootstrap';

const PostLinkPreview = ({ props, removeLinkPreview }) => {
    const { description, image, hostUrl, title} = props;

    return (
        <Card style={{ width: '100%' }}>
            <div className="post-preview-close" onClick={removeLinkPreview}>X</div>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{hostUrl}</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PostLinkPreview;

