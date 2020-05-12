import React from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField,
  Grid
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
class Profile extends React.Component {
  componentWillMount() {
    this.props.getProfile();
  }
  render() {
    const { data, isLoading } = this.props;
    console.log(data);
    if(data!=undefined)
    return (
      <Card className=" mr-3">
          <CardHeader
            subheader="Щоб змінити інформацію зверніться в навчальну частину"
            title="Профіль"
            avatar={<AccountCircleIcon/>}
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  disabled
                  label="Ім'я"
                  margin="dense"
                  name="firstName"
                  value={data.name}
                  defaultValue=" "
                  
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Дата народження"
                  margin="dense"
                  name="lastName"
                  disabled
                  value={data.dateOfBirth}
                  defaultValue=" "
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Електрона пошта"
                  margin="dense"
                  name="email"
                  value={data.email}
                  defaultValue=" "
                  disabled
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                
                <TextField
                  fullWidth
                  label="Номер телефону"
                  margin="dense"
                  name="adress"
                  disabled
                  value={data.phone}
                  defaultValue=" "
                  rowsMax="4"
                  variant="outlined"
                />
              
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Адрес"
                  margin="dense"
                  name="adress"
                  disabled
                  value={data.adress}
                  defaultValue=" "
                  rowsMax="4"
                  variant="outlined"
                />
              </Grid>
              
              
            </Grid>
          </CardContent>
      </Card>
    );
  else{
    return(<div className='spinner-border text-primary' role='status'>
    <span className='sr-only'>Завантаження...</span>
    </div>);
  }
  }
}
const mapStateToProps = (state) => {
  return {
    data: get(state, "profile.list.data"),
    isLoading: get(state, "profile.list.loading"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (filter) => {
      dispatch(getListActions.getProfile(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
