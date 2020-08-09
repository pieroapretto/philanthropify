import React, { useState, useRef  } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { saveImage, getLinkMetaData, addPost } from '../../actions/posts';
import isUrl from 'validator/lib/isURL';
import PostLinkPreview from './PostLinkPreview';
import PostImagePreview from './PostLinkPreview';

const PostForm = ({ userId, saveImage,  getLinkMetaData, savePost }) => {
    const [imagePreview, setImagePreview] = useState(false);
    const [linkPreview, setLinkPreview] = useState(false);
    const [postText, setPostText] = useState('');
    const hiddenFileInput = useRef(null);

    const handleUploadButtonClick = event => {
        hiddenFileInput.current.click();
    }

    const handleUploadImage = (e) => {
        const fileUpload = e.target.files[0];

        saveImage(fileUpload).then(url => {
            setImagePreview(url);
        });
    }

    const handlePreviewLink = (link) => {
        getLinkMetaData(link).then(metadata => {
            metadata.url = parsePreviweLinkUrl(metadata.url);
            setLinkPreview(metadata);
        });
    }

    const parsePreviweLinkUrl = (url) => {
        let link = document.createElement('a');
        link.href = url;
        return link.hostname;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        savePost({
            authorId: userId,
            text: postText,
            imageUrl: imagePreview,
            link: linkPreview
        });
    }

    const handleFormChange = event => {
        event.preventDefault();

        const inputText = event.target.value;
        setPostText(inputText);

        if(isUrl(inputText)) {
            handlePreviewLink(inputText);
        }
    }

    return (
        <div id="profile-post-form">
            <div className="row">
                <div className="col">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="PostForm.ControlTextarea" role="form">
                            <Form.Control as="textarea" rows={linkPreview || imagePreview ? 2 : 4} onChange={handleFormChange} />
                        </Form.Group>
                        <div id="profile-post-preview">
                            {linkPreview && <PostLinkPreview props={linkPreview} removeLinkPreview={() => setLinkPreview(false)}/>}
                            {imagePreview && <PostImagePreview imagePreview={imagePreview} removeImagePreview={() => setImagePreview(false)}/>}
                        </div>
                        <div className="profile-post-options"></div>
                        <div className="row">
                            <div className="col-8">
                                <div className="img-btn">
                                    <img src="images/icons/heart-circle-duotone.svg" alt="like button"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <input style={{display:'none'}} type="file" ref={hiddenFileInput} onChange={handleUploadImage}/>
                                <Button variant="secondary" onClick={handleUploadButtonClick}>Upload</Button>
                                <Button variant="primary" type="submit">Post</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.user.uid
});

const mapDispatchToProps = dispatch => ({
    saveImage: (image) => dispatch(saveImage(image)),
    getLinkMetaData: (link) => dispatch(getLinkMetaData(link)),
    savePost: (post) => dispatch(addPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);