import React from 'react';
import './LoginRegister.css';
import axios from 'axios';
import {Button, TextField} from "@mui/material";

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            firstName: '',
            fieldFirstName: '',
            fieldLastName: '',
            fieldOccupation: '',
            fieldDescription: '',
            fieldLocation: '',
            fieldUserName: '',
            fieldPassword: '',
        };
        this.handleFNChange = this.handleFNChange.bind(this);
        this.handleLNChange = this.handleLNChange.bind(this);
        this.handleLocChange = this.handleLocChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleOccChange = this.handleOccChange.bind(this);
        this.handleUsrChange = this.handleUsrChange.bind(this);
        this.handlePswdChange = this.handlePswdChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

    }


    handleRegister = () => {
        const {
            fieldFirstName,
            fieldLastName,
            fieldOccupation,
            fieldDescription,
            fieldLocation,
            fieldUserName,
            fieldPassword,
        } = this.state;

        const user = {
            first_name: fieldFirstName,
            last_name: fieldLastName,
            occupation: fieldOccupation,
            description: fieldDescription,
            location: fieldLocation,
            username: fieldUserName,
            password:fieldPassword,
        };

        axios.post('/api/register', user)
            .then((response) => {
                this.setState({
                    loggedIn:true,
                    firstName: response.data.firstName,
                });
            })
            .catch((error) => {
                console.error('Registration failed:', error);
            });
    }

    handleLogin = () => {
        const { fieldUserName, fieldPassword } = this.state;
        axios.post('/auth/login', { username: fieldUserName, password: fieldPassword })
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

    handleFNChange(event) {
        this.setState({
            fieldFirstName: event.target.value,
        });
    }
    handleLNChange(event) {
        this.setState({
            fieldLastName: event.target.value,
        });
    }
    handleLocChange(event) {
        this.setState({
            fieldLocation: event.target.value,
        });
    }
    handleDescChange(event) {
        this.setState({
            fieldDescription: event.target.value,
        });
    }
    handleOccChange(event) {
        this.setState({
            fieldOccupation: event.target.value,
        });
    }
    handleUsrChange(event) {
        this.setState({
            fieldUserName: event.target.value,
        });
    }
    handlePswdChange(event) {
        this.setState({
            fieldPassword: event.target.value,
        });
    }

    hideLogin(event){
        let login = document.getElementsByClassName("login")[0];
        login.classList.add("hidden");

        let register = document.getElementsByClassName("register")[0];
        register.classList.remove("hidden");
    }

    hideRegister(event){
        let login = document.getElementsByClassName("login")[0];
        login.classList.remove("hidden");

        let register = document.getElementsByClassName("register")[0];
        register.classList.add("hidden");
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
                    <div className={"Banner"}>
                        <h1>Welcome to TikTak</h1>
                        <h5>The worlds finest data mining platform</h5>
                    </div>

                    <div className={"login vertical"}>
                        <Button id={"hideLoginBtn"} variant={"outlined"} onClick={this.hideLogin}>Need to register instead?</Button>
                        <TextField value={this.state.fieldUserName} onChange={this.handleUsrChange} id={"UserName"} label="Username" variant="filled"></TextField>
                        <TextField value={this.state.fieldPassword} onChange={this.handlePswdChange} id={"Password"} label="Password" variant="filled"></TextField>
                        <Button id={"loginBtn"} variant={"contained"} onClick={this.handleLogin}>Login</Button>

                    </div>

                    <div className={"register vertical hidden"}>
                        <Button id={"hideRegBtn"} variant={"outlined"} onClick={this.hideRegister}>Need to login instead?</Button>
                        <TextField value={this.state.fieldFirstName} onChange={this.handleFNChange} id={"First_name"} label="First Name" variant="filled" ></TextField>
                        <TextField value={this.state.fieldLastName} onChange={this.handleLNChange} id={"Last_name"} label="Last Name" variant="filled"></TextField>
                        <TextField value={this.state.fieldLocation} onChange={this.handleLocChange} id={"Location"} label="Location" variant="filled"></TextField>
                        <TextField value={this.state.fieldDescription} onChange={this.handleDescChange} id={"description"} label="Description" variant="filled"></TextField>
                        <TextField value={this.state.fieldOccupation} onChange={this.handleOccChange} id={"occupation"} label="Occupation" variant="filled"></TextField>
                        <TextField value={this.state.fieldUserName} onChange={this.handleUsrChange} id={"New_UserName"} label="New Username" variant="filled"></TextField>
                        <TextField value={this.state.fieldPassword} onChange={this.handlePswdChange} id={"New_Password"} label="New Password" variant="filled"></TextField>
                        <Button id={"registerBtn"} variant={"contained"} onClick={this.handleRegister}>Register Account</Button>

                    </div>
                </div>
            )
            //return <Redirect to = "/login-register" />
        }
    }
}

export default LoginRegister;