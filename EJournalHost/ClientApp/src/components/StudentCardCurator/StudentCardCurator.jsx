import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
//import Image from 'material-ui-image';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {serverUrl} from '../../config';

const styles = theme => ({
  cardHeight: {
    color: '#009688',    
  },
  media: {
    height: '12rem',
  },
  minHeighr: {
    height: '30rem'
  }
})

class StudentCard extends React.Component {
  render(){
    const { student } = this.props;
    const { classes } = this.props;
    return (
        <Card className={classes.minHeighr}>
          <CardActionArea className={classes.minHeighr}>
            <CardMedia
              className={classes.media}
              image={`${serverUrl}UsersImages/150_${student.image}`}
              title="Contemplative Reptile"
            />
            {/* <Image
              onClick={() => console.log('onClick')}
              src=
              aspectRatio={(16/9)}
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h6">
                {student.name} {student.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                Спеціальність: {student.speciality}   
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                Середній балл: {student.progress}   
              </Typography>
              <Typography className={classes.cardHeight} variant="subtitle2" color="textSecondary" component="p">
                Група: {student.group}   
              </Typography>
              <Typography className={classes.cardHeight} variant="subtitle2" color="textSecondary" component="p">
                Адреса: {student.adress}   
              </Typography>
              <Typography className={classes.cardHeight} variant="subtitle2" color="textSecondary" component="p">
                Дата Народження: {student.dateOfBirth}   
              </Typography>
              <Typography className={classes.cardHeight} variant="subtitle2" color="textSecondary" component="p">
                EMail: {student.email}   
              </Typography>
              <Typography className={classes.cardHeight} variant="subtitle2" color="textSecondary" component="p">
                Телефон: {student.phoneNumber}   
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
  }
}
export default withStyles(styles)(StudentCard);