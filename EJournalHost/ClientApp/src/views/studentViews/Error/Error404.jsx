import React, { Component } from 'react';
import Error404Page from "../../../components/Error404"

class Error404 extends Component {
  render() {
    return (
      <Error404Page linkName="Перейти на головну сторінку" link="/#/student"/>
    );
  }
}

export default Error404;