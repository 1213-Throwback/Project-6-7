import React from 'react';
import {
    AppBar,
    Button,
    Divider, Link,
    List,
    ListItem,
    ListItemText, Toolbar,
    Typography,
}
    from '@mui/material';
import './userList.css';
import {Box} from "@mui/system";
import axios from 'axios';

/**
 * Define UserList, a React component of project #5
 */
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        };
    }

    componentDidMount() {
        const url = '/user/list';

        axios.get(url)
            .then(response => {
                this.setState({
                    userList: response.data
                });
            })
            .catch(error => console.error(error));
    }

  render() {
      const isLoggedIn = window.models.userModel.isLoggedIn;
      const { userList } = this.state;
      if (isLoggedIn){
          return (
              <div className={"UserList"}>
                  <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                      {userList.map((item, index) => (
                          <React.Fragment key={item._id}>
                              <ListItem>
                                  <Button href={"#/users/" + item._id}>{item.first_name}</Button>
                              </ListItem>
                              <Divider />
                          </React.Fragment>
                      ))}
                  </Box>
              </div>
          );
      }else{
          return (
              <div className={"LoggedOutListDIV"}>
                  <h3 id={"LoggedOutUserListTitle"}>User List</h3>
                  <hr></hr>
                  <p id={"LoginMessage"}>Log in to view users</p>
              </div>
          );
      }


  }
}


/*
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
              {window.models.userListModel().map((item, index) => (
                  <React.Fragment key={item._id}>
                      <ListItem>
                        <ListItemText key={index} primary={<a href={"users/:" + item._id}>{item.first_name}</a>}/>
                      </ListItem>
                      <Divider />
                  </React.Fragment>
              ))}
          </Box>
 */



export default UserList;
