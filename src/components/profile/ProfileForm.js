import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { saveImage } from '../../actions/posts';

const ProfileHeader = ({ saveImage }) => {

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        saveImage(file);
    }

    return (
        <div className="profile-post-form">
            <div className="row">
                <div className="col">
                    <Form>
                        <Form.Group controlId="postForm.ControlTextarea">
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

});


const mapDispatchToProps = dispatch => ({
    saveImage: (image) => dispatch(saveImage(image))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);