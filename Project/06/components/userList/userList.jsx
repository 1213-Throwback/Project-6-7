import React from 'react';
import {
    Button,
    Divider, Link,
    List,
    ListItem,
    ListItemText,
    Typography,
}
    from '@mui/material';
import './userList.css';
import {Box} from "@mui/system";
import fetchModel from '../../lib/fetchModelData';

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

        fetchModel(url)
            .then(response => {
                this.setState({
                    userList: response.data
                });
            })
            .catch(error => console.error(error));
    }

  render() {
        const { userList } = this.state;
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
