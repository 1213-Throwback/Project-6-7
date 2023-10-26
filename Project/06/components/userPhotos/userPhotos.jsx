import React from 'react';
import {
    Button, TextField,
    Typography
} from '@mui/material';
import './userPhotos.css';
import axios from 'axios';
import userPhotos from "../../../p5/project-5-solution/components/userPhotos/userPhotos";

/**
 * Define UserPhotos, a React componment of project #5
 */
class UserPhotos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            user_id: null,
            userPhotos: []
        };
    }


    handleChange(id){
        if(id !== this.state.user_id){
            //Fetch user photos
            axios.get(`/photosOfUser/${id}`)
                .then(response => {
                    console.log("Photos:",response.data);
                    this.setState({
                        userPhotos: response.data,
                    });
                })
                .catch(error => console.error(error));

            // Fetch user details
            axios.get(`/user/${id}`)
                .then(response => {
                    console.log("User info:", response.data);
                    this.setState({
                        user: response.data,
                        user_id: response.data._id
                    });

                })
                .catch(error => console.error(error));
        }
    }
    componentDidMount() {
        this.handleChange(this.props.match.params.userId);
    };

    componentDidUpdate() {

    }

    render() {
        const user = this.user
        if(!user){
            console.log("Waiting for info")
            return (<div></div>);
        }

        const userId = this.props.match.params.userId;
        let detailLink = "#/users/" + userId;
        console.log(this.userPhotos);
        userPhotos
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
