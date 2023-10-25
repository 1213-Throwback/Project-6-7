import React from 'react';
import {
    Button, TextField,
    Typography
} from '@mui/material';
import './userPhotos.css';
import fetchModel from '../../lib/fetchModelData';

/**
 * Define UserPhotos, a React componment of project #5
 */
class UserPhotos extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userId = this.props.match.params.userId;
        const user = window.models.userModel(userId);
        let detailLink = "#/users/" + userId;

        let photosList = window.models.photoOfUserModel(userId);
        let photos = photosList.map((photo, index) => (
            <div className={"PhotoDiv"}>
                <p className={"PhotoDate"}>Posted on: {photo.date_time}</p>
                <img key={`${photo._id}`} src={"images/" + photo.file_name} alt={`${user.first_name}#${index}`} className={"Photo"}/>

                {photo.comments ?
                    photo.comments.map((comment) => (
                        <div key={comment._id} className={"Comments"}>
                            <h3 key = "user" className={"User"}>
                                <a href={"#/users/" + comment.user._id}> {comment.user.first_name + " " + comment.user.last_name}</a>
                            </h3>
                            <p key = "date" className={"date"}>
                                 {comment.date_time}
                                <hr/>
                            </p>
                            <p key= "comment" className={"Comment"}>
                                {comment.comment}
                            </p>
                        </div>
                    ))
                    : (
                        <div className={"Comments"}>
                            <p id={"NoComment"}>
                                No Comments
                            </p>
                        </div>
                    )}
            </div>
        ));


        return (
            <div>
                <Button href={detailLink}>User Details</Button>
                <p className={"PageOwner"}>{user.first_name + " " + user.last_name + "'s Photos"}</p>
                {photos.map((photo, index) => (
                    <div key={index} >{photo}</div>
                ))}
            </div>
        );
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;


        // Fetch user details
        fetchModel(`/user/${userId}`)
            .then(response => {
                this.setState({
                    user: response.data
                });
            })
            .catch(error => console.error(error));

        // Fetch user photos
        fetchModel(`/photosOfUser/${userId}`)
            .then(response => {
                this.setState({
                    userPhotos: response.data
                });
            })
            .catch(error => console.error(error));
    }
}

export default UserPhotos;
