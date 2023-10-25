import React from 'react';
import {
    Button, TextField,
    Typography
} from '@mui/material';
import './userPhotos.css';
import axios from 'axios';

/**
 * Define UserPhotos, a React componment of project #5
 */
class UserPhotos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userPhotos: [],
        };
    }

    componentDidMount() {
        let photoHolder = null;
        const userId = this.props.match.params.userId;
        //Fetch user photos
        axios.get(`/photosOfUser/${userId}`)
            .then(response => {
                console.log("Photos:",response.data);
                photoHolder = response.data;
            })
            .catch(error => console.error(error));

        // Fetch user details
        axios.get(`/user/${userId}`)
            .then(response => {
                console.log("User info:", response.data);
                this.setState({
                    userPhotos: photoHolder,
                    user: response.data
                });

            })
            .catch(error => console.error(error));


    };

    render() {
        const user = this.user
        if(!user){
            console.log("Waiting for info")
            return null;
        }

        const userId = this.props.match.params.userId;
        let detailLink = "#/users/" + userId;
        console.log(this.userPhotos);
        let photos = this.userPhotos.map((photo, index) => (
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


}

export default UserPhotos;
