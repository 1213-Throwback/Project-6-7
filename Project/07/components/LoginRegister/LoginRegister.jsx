import React from 'react';
import {
    AppBar, Toolbar, Typography
} from '@mui/material';
import './LoginRegister.css';
import axios from 'axios';

class LoginRegister extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedIn: false,
            firstName: '',
        };
    }

    handleLogin = () => {}

    handleLogout = () => {}


    render(){
        if(this.state.loggedIn){
            return(
                <div>
                    <p>Hi {this.state.firstName}</p>
                    <button onClick = {this.handleLogout}>Logout</button>
                </div>
            );
        }
        else {
            return <Redirect to = "/login-register" />
        }
    }
}