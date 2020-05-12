import React from 'react';
import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import GroupNewsModal from "./GroupNewsModal.jsx";
import { Grid } from "@material-ui/core";
class GroupNews extends React.Component {
  
  
  componentWillMount(){
    this.props.getNews();
  }

  render(){
    const {data}= this.props;
    console.log(data);
    if(data.news!=undefined)
    return (
      <React.Fragment>
        {data.news.map(function (el) {
          return (
            <Grid lg={3} md={4} xl={3} xs={6} item>
            <GroupNewsModal el={el} key={el.id}/>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  else{
    return(<div className='spinner-border text-primary' role='status'>
    <span className='sr-only'>Завантаження...</span>
    </div>);
  }
}
};
const mapStateToProps = state => {
  return {
    data: get(state, 'groupNews.list.data')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNews: () => {
        dispatch(getListActions.getNews());
    }
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(GroupNews);

