import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import "./homeworkStyle.css";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";
const propTypes = {
  el: PropTypes.any,
  count:PropTypes.any
};

class HomeworkPopover extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          popoverOpen: false,
        };
      }
  toggle() {
    const { popoverOpen } =this.state;
    this.setState({
      popoverOpen: !popoverOpen,
    });
  }
  render() {
    const { el,count } = this.props;

    return (
      <Card className="mt-3">
        <CardHeader
          avatar={
            <div>
              <InfoIcon onClick={this.toggle} id={"Popover"+count} className="hover"></InfoIcon>
              <Popover
                isOpen={this.state.popoverOpen} 
                target={'Popover'+count} toggle={this.toggle} 
                trigger="legacy" delay={0}
              >
                <PopoverHeader className="text-color">{el.subject}</PopoverHeader>
                <PopoverBody>
                    <div className="d-flex flex-row">
                        <h6 className="text-color mr-2">Тема:</h6>
                        <h6>{el.topic}</h6>
                    </div>
                    <div className="d-flex flex-row">
                        <h6 className="text-color mr-2">Вчитель:</h6>
                        <h6>{el.teacher}</h6>
                    </div>
                    <div className="d-flex flex-row">
                        <h6 className="text-color mr-2">Видано:</h6>
                        <h6>{el.date}</h6>
                    </div>
                </PopoverBody>
              </Popover>
            </div>
          }
          title={el.subject}
          className="head-color"
        />
        <CardContent>
          <p>{el.homework}</p>
        </CardContent>
      </Card>
    );
  }
}

HomeworkPopover.propTypes = propTypes;

export default HomeworkPopover;
