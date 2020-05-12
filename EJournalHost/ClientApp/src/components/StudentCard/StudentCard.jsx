import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
//import Image from 'material-ui-image';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {serverUrl} from '../../config';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBRow, MDBCol } from "mdbreact";

const styles = theme => ({
  cardHeight: {
    color: '#009688',    
  },
  media: {
    height: '12rem',    
    'border-radius' : '50%'
  },
  minHeighr: {
    height: '22rem'
  },
  modalText: {
    color: '#616161'
  },
  modalImage: {
    width: '8rem',
    height: '8rem',
    'border-radius':'50%'
  },
  modalNameText: {
    color: '#ffbb33',
    'font-weight': 'bold',
    'font-size': '1.3rem'
  }
})

class StudentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: false, modal4: false};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render(){
    const { student } = this.props;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Card className={classes.minHeighr} onClick={this.handleClick}>
          <CardActionArea className={classes.minHeighr}>
            <CardMedia
              className={classes.media}
              image={`${serverUrl}UsersImages/250_${student.image}`}
              title="Contemplative Reptile"
            />            
            <CardContent>
              <Typography gutterBottom variant="h6">
                {student.name} {student.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                Спеціальність: {student.speciality}   
              </Typography>
              <Typography className={classes.cardHeight} variant="subtitle2" color="textSecondary" component="p">
                Група: {student.groupName}   
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <MDBContainer>
            <MDBModal isOpen={this.state.isToggleOn} toggle={this.handleClick} size="lg">
                <MDBModalHeader toggle={this.handleClick}>
                  <div>
                    <MDBRow>
                      <MDBCol md="4" className="mb-3">
                        <img src={`${serverUrl}UsersImages/250_${student.image}`} className={`img-fluid z-depth-1 ${classes.modalImage}`} alt="" />
                      </MDBCol>
                      <MDBCol md="8" className="mb-3">
                      <span className={classes.modalNameText}>                  
                        {student.name} {student.lastName} {student.surname}
                      </span>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </MDBModalHeader>
                <MDBModalBody>
                  <h4>
                    <span className="font-weight-bold">Спецальність: </span>
                    <span className={classes.cardHeight}>{student.speciality}</span>
                  </h4>
                  <h4>
                    <span className="font-weight-bold">Група: </span>
                    <span className={classes.cardHeight}>{student.groupName}</span>
                  </h4>
                  <h4>
                    <span className="font-weight-bold">Пошта: </span>
                    <span className={classes.modalText}>{student.email}</span>
                  </h4>
                  <h4>
                    <span className="font-weight-bold">Номер телефону(моб.): </span>
                    <span className={classes.modalText}>{student.phoneNumber}</span>
                  </h4>
                  <h4>
                    <span className="font-weight-bold">Адреса: </span>
                    <span className={classes.modalText}>{student.adress}</span>
                  </h4>
                  <h4>
                    <span className="font-weight-bold">Дата народження: </span>
                    <span className={classes.modalText}>{student.dateOfBirth}</span>
                  </h4>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="warning" onClick={this.handleClick}>Закрити</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
      </React.Fragment>
      );
  }
}
export default withStyles(styles)(StudentCard);