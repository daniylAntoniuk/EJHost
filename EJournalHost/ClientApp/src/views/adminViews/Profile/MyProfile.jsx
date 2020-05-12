import React from "react";
import {
  Grid,
} from "@material-ui/core";
import Profile from "../../../components/Profile/Profile.jsx";
import Password from "../../../components/ChangePassword/Password.jsx";
import ChangeImage from "../../../components/ChangeImage/ChangeImage.jsx";
class MyProfile extends React.Component {
  render() {
    
    return (
      <div>
        <Grid className="mt-4" container>
          <Grid item lg={4} md={6} xl={4} xs={12}>
              <ChangeImage></ChangeImage>
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <Profile></Profile>
            <Password></Password>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default MyProfile;
