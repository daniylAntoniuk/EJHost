import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Progress } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  invert: PropTypes.bool,
};

const defaultProps = {
  header: '87.500',
  icon: 'icon-people',
  color: 'danger',
 
  invert: true,
};

class Widget04 extends Component {
  render() {
    const { className, cssModule, header, icon, color, value, children, invert, ...attributes } = this.props;

    // demo purposes only
    
    const card = { style: '', bgColor: '', icon: icon };

    if (invert) {
      
      card.style = 'text-white';
      console.log(color);
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
  

    return (
      <Card className={classes} {...attributes}>
        <CardBody>
          <div className="h1 text-muted text-right mb-2">
            <i className={card.icon}></i>
          </div>
          <div className="text-start h4 mb-0">{header}</div>
          <small className="text-muted text-uppercase font-weight-bold">{children}</small>
        </CardBody>
      </Card>
    );
  }
}

Widget04.propTypes = propTypes;
Widget04.defaultProps = defaultProps;

export default Widget04;