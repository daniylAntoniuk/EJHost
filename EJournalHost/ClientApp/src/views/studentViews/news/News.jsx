import React, { useState } from "react";
import * as getListActions from "./reducer";
import { connect } from "react-redux";
import get from "lodash.get";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import GroupNews from '../../../components/groupNews'
import NewsModal from "../../../components/news/NewsModal";
class News extends React.Component {
  componentDidMount() {
    this.props.getData();
  }
  load = () => {
    const { data } = this.props;
    if (data.news != undefined) {
      return (
        <React.Fragment>
          {data.news.map(function (el) {
            return (
              <Grid lg={4} md={6} xl={3} xs={12} item>
                <NewsModal key={el.id} el={el} />
              </Grid>
            );
          })}
          </React.Fragment>
        
      );
    }
  };
  render() {
    //const {data}= this.props;
    //console.log(data);
    return <React.Fragment>
      <Grid className="mt-3" container justify="right" spacing={2}>
      {this.load()}
      </Grid>
      <Typography variant="h4" className="mt-3 ml-2" gutterBottom>Новини групи :</Typography>
      <Grid className="mt-3" container justify="right" spacing={2}>
      <GroupNews/>
      </Grid>
      </React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: get(state, "news.list.data"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => {
      dispatch(getListActions.getNews());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
//export default News;
