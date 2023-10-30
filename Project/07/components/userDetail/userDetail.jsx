import React from 'react';
import {
    Button,
    Typography
} from '@mui/material';
import './userDetail.css';
import axios from 'axios';

/**
 * Define UserDetail, a React component of project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user:null,
        userID: null
    };
  }

/*
        This should be the UserDetail view of the PhotoShare app. Since
        it is invoked from React Router the params from the route will be
        in property match. So this should show details of user:
        {this.props.match.params.userId}. You can fetch the model for the
        user from window.models.userModel(userId).
 */
    componentDidMount() {
        const new_user_id = this.props.match.params.userId;
        this.handleUserChange(new_user_id);
    }

    componentDidUpdate() {
        const new_user_id = this.props.match.params.userId;
        const current_user_id = this.state.user._id;
        if (current_user_id  !== new_user_id){
            this.handleUserChange(new_user_id);
        }
    }

    handleUserChange(user_id) {
        //if (user_id !== this.state.userID) {
            axios.get("/user/" + user_id)
                .then((response) => {
                    const new_user = response.data;
                    this.setState({
                        user: new_user,
                        userID: new_user._id
                    });
                    // Update main_content in state if needed
                    const main_content = "User Details for " + new_user.first_name + " " + new_user.last_name;
                });
        //}
    }




    render() {
        const {user} = this.state;
        if(!user){
            return null;
        }

    const photosLink = "#/photos/" + user._id;
    return (
        <div className = "user-detail">
            <p></p>
            <Button href={photosLink}>User Photos</Button>
            <p className={"PageOwner"}>{user.first_name + " " + user.last_name + "'s Profile"}</p>
            <Typography variant = {'caption'} className={"User-ID"}>{`User ID: ${user._id}`}</Typography>
            <hr/>
            <Typography variant = 'body1' className={"Location"}>{`Location: ${user.location}`}</Typography>
            <Typography variant = 'body1' className={"Occupation"}>{`Occupation: ${user.occupation}`}</Typography>
            <Typography variant = 'body1' className={"Description"}>{`Description: ${user.description}`}</Typography>
        </div>
    );
  }
}

export default UserDetail;
