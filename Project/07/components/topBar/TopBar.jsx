import React from 'react';
import {
    AppBar, Toolbar, Typography
} from '@mui/material';
import './TopBar.css';
import axios from 'axios';

/**
 * Define TopBar, a React componment of project #5
 */
class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            app_info: undefined
        };
    }

    componentDidMount() {
        this.handleAppInfoChange();
    }

    handleAppInfoChange(){
        const app_info = this.state.app_info;
        if (app_info === undefined){
            axios.get("/test/info")
                .then((response) =>
                {
                    this.setState({
                        app_info: response.data
                    });
                });
        }
    }

    render() {
        const isLoggedIn = window.models.userModel.isLoggedIn;
        if (isLoggedIn){
            return this.state.app_info ? (
                <AppBar className="topbar-appBar" position="absolute">
                    <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>Will Russo</Typography>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} color="inherit">{this.props.main_content}</Typography>
                        <Typography variant="h5" component="div" color="inherit">Version: {this.state.app_info.__v}</Typography>
                    </Toolbar>
                </AppBar>
            ) : (
                <div/>
            );
        }else{
            return this.state.app_info ? (
                <AppBar className="topbar-appBar" position="absolute">
                    <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} color="inherit">{this.props.main_content}</Typography>
                        <Typography variant="h5" component="div" color="inherit">LOG IN</Typography>
                    </Toolbar>
                </AppBar>
            ) : (
                <div/>
            );
        }

    }
}

export default TopBar;
