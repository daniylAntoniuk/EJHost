import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getSubjectActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { Dropdown } from 'primereact/dropdown';
import{ ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Badge } from 'reactstrap'; 
import './GetMarksService';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function mapHeadTable(data) {
  console.log("head " + data.columns);
  if (data.columns != undefined) {
      return data.columns.map(function (item) {
          return (<th style={{textAlign: "center"}} key={item}>{item}</th>);
      });
  }
}
function mapBodyTable(data) {
  let counter = 1;
  console.log("body " + data.rows);
  if (data.rows != undefined) {
      return data.rows.map(item => {
          return (
              <tr>
                  <th scope="row">{counter++}</th>
                  <td key={counter}>{item.name}</td>
                  {
                      item.marks.map(mark => {
                        let colorBadge;
                        if(+mark >= 10)
                          colorBadge = "success";
                        else if(+mark >= 6 && +mark < 10)
                          colorBadge = "warning";
                        else if(+mark>0 && +mark<6)
                          colorBadge = "danger";
                        else
                        {
                          colorBadge = "none";
                          mark = " ";}
                          return (
                              <td key={mark}><h3 style={{textAlign: "center"}}><Badge className="mr-1" color={colorBadge}>{mark}</Badge></h3></td>
                          )
                      })
                  }
              </tr>
          );
      });
  }
}

class GetMarks extends Component {
  state = {
    subject: null,
    marks:null
  }
    // constructor(props) {
    //     super(props);
    
    //     this.toggle = this.toggle.bind(this);
    //     this.state = {
    //       dropdownOpen: false,
    //       subject: '',
    //       marks:[]
    //     };
    //   }
    
    //   toggle(i) {
    //     const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    //     this.setState({
    //       dropdownOpen: newArray,
    //       subject:"math",
    //     });
    //   }

  componentDidMount = () => {
    this.props.getSubject();
  }

  // componentWillReceiveProps = () => {
  //   console.log("Will state", this.state);
  //   const {subject} = this.state;
  //   //console.log("*************", this.state);
  //   this.props.getMarks({subject});
  // }

  changeSubject=(e)=>{
    console.log("SETSTATE", e.target.value);
    let subjectId = e.target.value;
    this.setState({subject: subjectId});
    console.log("This state", this.state);
    console.log("This props", this.props);

    
    this.props.getMarks({subjectId});
  }

      // changeMonth=(e)=>{
      //   this.setState({month: e.value});
      // }

  render() { 
    const {listMarks, listSubject} = this.props;
    //const {subject, marks} = this.state;
    console.log("ListSubject", listSubject);
    console.log("STATE", this.state);

    if(listSubject !== undefined){
      return ( 
        <React.Fragment>
          <InputLabel>Оберіть предмет:</InputLabel>
          <Select
            className="mr-3"
            style={{ minWidth: 150 }}
            value={this.state.subject}
            onChange={this.changeSubject}
            // onChange={(e) => {
            // this.setState({ subject: e.target.value, marks:null });
            // }}
            // onChange={handleChange}
          >
            {/* <MenuItem key={""}>Оберіть предмет</MenuItem> */}
              {listSubject.map(function (el) {
                return <MenuItem value={el.id}>{el.name}</MenuItem>;
              })}
          </Select>
          <MDBTable>
            <MDBTableHead color="info-color" textWhite>
              <tr>
                {
                  mapHeadTable(listMarks)
                }
              </tr>
            </MDBTableHead>
            <MDBTableBody>
             {
                mapBodyTable(listMarks)
             }
            </MDBTableBody>
          </MDBTable>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log("mapStateto props", state);
    return {
        listMarks: get(state, 'getSubject.list.marks'),
        listSubject: get(state, 'getSubject.list.subject') 
    };
  }
  
const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatch");
  return {
    getMarks: filter => {
    dispatch(getListActions.getMarks(filter));
    },
    getSubject:()=>{
    dispatch(getSubjectActions.getSubject());
    }
  }
}
   
export default connect(mapStateToProps, mapDispatchToProps)( GetMarks );