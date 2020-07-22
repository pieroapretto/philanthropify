import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { saveImage, getLinkMetaData } from '../../actions/posts';

const PostForm = ({ saveImage,  getLinkMetaData }) => {
    const [imageUrl, setImageUrl] = useState(false);

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        saveImage(file).then(url => {
            setImageUrl(url);
        });
    }

    const handlePreviewLink = (e) => {
        const link = e.target.value;
        getLinkMetaData(link).then(metadata => {
            console.log(metadata);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }

    return (
        <div className="profile-post-form">
            <div className="row">
                <div className="col">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="PostForm.ControlTextarea" role="form">
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                        <div className="profile-post-preview"></div>
                        <div className="profile-post-options"></div>
                        <div className="row">
                            <div className="col-8">
                                <div className="img-btn">
                                    <img src="images/icons/heart-circle-duotone.svg" alt="like button"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <input type="file" onChange={handleUploadImage}/>
                                <input type="text" onBlur={handlePreviewLink}/>
                                <Button variant="primary" type="submit">Post</Button>
                            </div>
                        </div>
                        {imageUrl &&
                            <div className="row">
                                <img src={imageUrl}/>
                            </div>
                        }
                    </Form>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    saveImage: (image) => dispatch(saveImage(image)),
    getLinkMetaData: (link) => dispatch(getLinkMetaData(link)),
    savePost: (post) => dispatch(savePos(post))
});

export default connect(null, mapDispatchToProps)(PostForm);