import React, { Component,useState } from 'react';

import * as getListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { Table } from 'reactstrap';
import {Dropdown} from 'primereact/dropdown';
import TimetableModal from "../../../components/TimetableModal";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from "@material-ui/core/Typography";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./TimeTableStyle.css";

  //лоадим 7 днів з масиву
  function LoadDays(data,arr){
      return(
    arr.map(function(el) {
       //якщо наш елемент не дата, то робим пропуск для того щоб наші справжні дати були під 
       //потрібним днем тижня
        if(el>=200){
            return(<td></td>);
        }
        
        return(
        <td>
          <TimetableModal data={data} date={el}></TimetableModal>       
    </td>
    );
    }))
   
}
//лоадим день тижня для дати...
  function LoadTimetable(data){
      
    if(data.timetable!=undefined||data===undefined){
      if(data.daysInMonth!=undefined){
        
          let numOfDay=0;
          switch (data.dayOfWeek) {
              case "Monday":
                  
                  break;
                case "Tuesday":
                    numOfDay+=1;
                    break;
                case "Wednesday":
                    numOfDay+=2;
                    break;
                    case "Thursday":
                    numOfDay+=3;
                    break;
                    case "Friday":
                    numOfDay+=4;
                    break;
                    case "Saturday":
                    numOfDay+=5;
                    break;
                    case "Sunday":
                    numOfDay+=6;
                    break;
              default:
                  break;
          }
          let arr=[];
          
          //фіктивна дата для розташування справжньої під своїм днем тижня
          for (let i = 1; i <= numOfDay; i++) {
              if(i==1)
              arr.push(200);
              else
              arr.push(200+i);
              
          }
          //запихуєм к-ст днів в цикл, щоб їх замапити
           for (let i = 1; i <= data.daysInMonth; i++) {
                arr.push(i);
                
            }
           //console.log(arr);
            
        return(
           
            
                arr.map(function(el) {
                    
                    if(el==200){
                        let array=[arr[0],arr[1],arr[2],
                        arr[3],arr[4],arr[5],arr[6]]; 
                        return (
               
                            <tr>
                                {LoadDays(data,array)}
                            </tr>
                            
                             );
                    }
                    
                    
                    else if(el==1&&numOfDay==0){
                        let array=[arr[0],arr[1],arr[2],
                        arr[3],arr[4],arr[5],arr[6]]; 
                        return (
               
                            <tr>
                                {LoadDays(data,array)}
                            </tr>
                            
                             );
                    }
                    
                    else if(el%7==0){
                        
                        let array=[];
                        for (let i = el; i < el+7; i++) {
                            
                          if(i==arr.length){
                              break;
                          }
                          array.push(arr[i]);
                            
                        }
                        if(array[0]!=undefined){
                        return (
               
                            <tr>
                                {LoadDays(data,array)}
                            </tr>
                            
                             );}
                    }
                    else if(numOfDay==5||numOfDay==6){
                        if(el==31){                           
                            if(numOfDay==6){
                                let array=[arr[arr.length-2],arr[arr.length-1]];
                                    return( <tr>
                                             {LoadDays(data,array)}
                                        </tr>);                                                             
                            }                                                     
                            if(numOfDay==5){
                                let array=[31];
                                if(array[0]!=undefined){
                                    return (
                           
                                        <tr>
                                            {LoadDays(data,array)}
                                        </tr>
                                        
                                         );
                                }
                            }
                        }
                        if(numOfDay==6&&el==30){
                            if(el==30&&arr[arr.length-1]!=31){
                                
                            
                                let array=[arr[arr.length-1]];
                                    return( <tr>
                                             {LoadDays(data,array)}
                                        </tr>);
                            }                   
                        }
                            
            } 
          }))
      }
    }
    else{
        //якщо нема дати викидаємо кружечок який крутиться
        return(<div className='spinner-border text-primary' role='status'>
        <span className='sr-only'>Завантаження...</span>
      </div>)
    }
  }
  
class Timetable extends Component {

    
    
    state = {
        month: '',        
      }
   
   
    componentDidMount = () => {
        //this.mouseEnter();
      
        const{month} = this.state;
        this.props.getTimetable({month });

      }
      componentWillReceiveProps = () => {
        //this.mouseEnter();
      
        const{month} = this.state;
        this.props.getTimetable({month });

      }
      // changeMonth=(e)=>{
      //   this.setState({month: e.value});       
      // }
      
      next=()=>{
        const {data} = this.props;
        if(data.month!='12'){
          this.setState({month:  +data.month+1});
        }
      }
      prev=()=>{
        const {data} = this.props;
        if(data.month!='1'){
          this.setState({month:  +data.month-1});
        }
      }
      getMonth=(data,arr)=>{
        if(data.month!=undefined){        
          return(
            arr[+data.month-1]
          )
        }      
      }
render() {
    const {data} = this.props;
  //   const monthSelectItems = [
  //     {label: 'Січень', value: '01'},
  //     {label: 'Лютий', value: '02'},
  //     {label: 'Березень', value: '03'},
  //     {label: 'Квітень', value: '04'},
  //     {label: 'Травень', value: '05'},
  //     {label: 'Червень', value: '06'},
  //     {label: 'Липень', value: '07'},
  //     {label: 'Серпень', value: '08'},
  //     {label: 'Вересень', value: '09'},
  //     {label: 'Жовтень', value: '10'},
  //     {label: 'Листопад', value: '11'},
  //     {label: 'Грудень', value: '12'},
  // ];
  const months=['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
  //this.setMonth(data);
  
    return (
        <div className="mt-3">
          <div style={{wigth:'100%'}} className="d-flex justify-content-center">
            <div className="d-flex flex-row">
            
            <KeyboardArrowLeft className="hover-cursor" fontSize="large" onClick={this.prev}/>
                <Typography variant="h6" className="ml-2 mr-2" gutterBottom>
                {this.getMonth(data,months)}
                </Typography>
              
            <KeyboardArrowRight className="hover-cursor" fontSize="large" onClick={this.next}/>
            </div>
          </div>
          {/* <Dropdown value={this.state.month} className="mt-3 ml-1" options={monthSelectItems} onChange={(e)=>this.changeMonth(e)} placeholder="Оберіть місяць"/> */}
       <Table responsive borderless className="text-center mt-3 mr-3">
                  <thead>
                    <tr>
                      <th>ПН</th>
                      <th>ВТ</th>
                      <th>СР</th>
                      <th>ЧТ</th>
                      <th>ПТ</th>
                      <th>СБ</th>
                      <th>НД</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LoadTimetable(data)}
                  </tbody>
                </Table>
        
      </div>
     
        )
    
    
    }
}
    

const mapStateToProps = state => {
    return {
        data: get(state,'timetable.list.data'), 
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getTimetable: filter => {
        dispatch(getListActions.getTimetable(filter));
      }
    }
  }
   
export default connect(mapStateToProps, mapDispatchToProps)(Timetable);

