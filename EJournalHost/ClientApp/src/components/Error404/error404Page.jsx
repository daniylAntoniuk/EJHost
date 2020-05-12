import React from "react";
import PropTypes from "prop-types";
import { Button, Jumbotron } from 'reactstrap';
import "./errorStyle.css"
import logo from "../../assets/logo3big.png";
import logoFull from "../../assets/logo3full.png";
const propTypes = {
  link: PropTypes.string,
  linkName: PropTypes.string,
};


const error404Page = (props) => {
  const { link, linkName } = props;

  return (
    <React.Fragment>
                <Jumbotron className="ml-3 mt-5">
                  <img height={100} src={logoFull}/>
                  <h1 className="display-3 color-bl">Помилка 404!</h1>
                  <p className="lead">Сторінка яку ви шукаєте видалена або переміщена</p>
                  <p className="lead">
                    <Button color="primary" href={link}>{linkName}</Button>
                  </p>
                </Jumbotron>
    </React.Fragment>
  );
};

error404Page.propTypes = propTypes;

export default error404Page;
