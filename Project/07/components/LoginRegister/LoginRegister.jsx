import React from 'react';
import './LoginRegister.css';
import axios from 'axios';

class LoginRegister extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            firstName: '',
            loginError: '',
        };
    }

    handleLogin = () => {
        const {username, password} = this.state;
        axios.post('/auth/login', {username, password})
            .then((response) => {
                this.setState({
                    loggedIn: true,
                    firstName: response.data.firstName,
                    loginError: '',
                });
            })
            .catch((error) => {
                this.setState({
                    loggedIn:false,
                    firstName: '',
                    loginError: 'Login failed. Please try again.',
                });
            });
    }

    handleLogout = () => {
        axios.post('/auth/logout')
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
            return (
                <div>
                    <p>{this.state.loginError}</p>
                    <input
                        type = "text"
                        placeholder = "Username"
                        value = {this.state.username}
                        onChange = {(e) => this.setState({username: e.target.value })}
                    />
                    <input
                        type = "password"
                        placeholder = "Password"
                        value = {this.state.password}
                        onChange = {(e) => this.setState({password: e.target.value })}
                    />
                    <button onClick = {this.handleLogin}>Login</button>
                </div>
            );
        }
    }
}
