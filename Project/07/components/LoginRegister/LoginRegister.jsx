import React from 'react';
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

    handleLogin = () => {
        axios.post('/api/login', {username, password})
            .then((response) => {
                this.setState({
                    loggedIn: true,
                    firstName: response.data.firstName,
                });
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    }

    handleLogout = () => {
        axios.post('/api/logout')
            .then(() => {
                this.setState({
                    loggedIn: false,
                    firstName: '',
                });
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    }


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

export default LoginRegister;