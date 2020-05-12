import React, { Component } from 'react';
import './loader.css';
class Loader extends Component {
    state = {}
    render() {
        return (
            <div className="eclipse" >
               <div className="spiner">
               <div className="spinner-grow spinner-grow-lg  text-info" role="status">
                <span className="sr-only">Loading...</span>
               </div>
              
            </div>
           
            </div>
           
        );
    }
}

export default Loader;