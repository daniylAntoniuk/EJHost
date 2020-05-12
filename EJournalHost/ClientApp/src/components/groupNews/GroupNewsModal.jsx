import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
//import "./timetableModal.css";
import Typography from "@material-ui/core/Typography";
const propTypes = {
  el: PropTypes.any,
};

const GroupNewsModal = (props) => {
  const { el } = props;
  const [modal, setModal] = React.useState(false);
  
  const createMarkup = () => {
    
    return (
      <div>
        {/* <Typography className="ml-2" variant="h5" gutterBottom>
        {el.topic}
        </Typography> */}
        <Typography className="ml-3 mt-1" variant="body1" gutterBottom>
        {el.content}
        </Typography>
  
        <div className="d-flex flex-row mt-3" style={{ width: "100%" }}>
          <div className="d-flex flex-column">
            <Typography className="text-muted" variant="subtitle1" gutterBottom>
              Дата публікації: {el.dateOfCreate}
            </Typography>
          </div>
          <div className="d-flex justify-content-end" style={{ width: "100%" }}>
            <Typography className="text-muted" variant="subtitle1" gutterBottom>
            {el.teacher}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
  const toggle = () => {
    setModal(!modal);
  };
  return (
     
    
      <React.Fragment>
        <Card className="mt-3" onClick={toggle}>
          <CardActionArea>
            <CardContent>
              <div className="d-flex flex-column" style={{ width: "100%" }}>
                <Typography variant="h5" gutterBottom>
                  {el.topic}
                </Typography>
                <div className="d-flex flex-row mt-2" style={{ width: "100%" }}>
                  <Typography
                    className="text-muted"
                    variant="subtitle1"
                    gutterBottom
                  >
                   {el.dateOfCreate}
                  </Typography>
                 
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <MDBModal
          size="lg"
          color="primary"
          backdrop={true}
          isOpen={modal}
          toggle={toggle}
        >
          <MDBModalHeader
            className="bg-primary"
            toggle={toggle}
          >{el.topic}</MDBModalHeader>
          <MDBModalBody color="primary">{createMarkup()}</MDBModalBody>
        </MDBModal>
      </React.Fragment>
    
        
  );
};

GroupNewsModal.propTypes = propTypes;

export default GroupNewsModal;
