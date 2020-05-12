import GetMarksService from './GetMarksService';
import update from '../../../helpers/update';

export const GETMARKS_TABLE_STARTED = "GETMARKS_TABLE_STARTED";
export const GETMARKS_TABLE_SUCCESS = "GETMARKS_TABLE_SUCCESS";
export const GETMARKS_TABLE_FAILED = "GETMARKS_TABLE_FAILED";

export const GETSUBJECT_STARTED = "GETSUBJECT_STARTED";
export const GETSUBJECT_SUCCESS = "GETSUBJECT_SUCCESS";
export const GETSUBJECT_FAILED = "GETSUBJECT_FAILED";

const initialState = {
    list: {
        subject: [],
        marks: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getMarks = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        GetMarksService.getMarks(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err));
            });
    }
}

export const getSubject = () => {
    return (dispatch) => {
        dispatch(getSubjectActions.started());
        GetMarksService.getSubject()
            .then((response) => {
                console.log("response", response);
                dispatch(getSubjectActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getSubjectActions.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: GETMARKS_TABLE_STARTED
        }
    },  
    success: (data) => {
        return {
            type: GETMARKS_TABLE_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: GETMARKS_TABLE_FAILED,
            errors: error
        }
    }
  }

  export const getSubjectActions = {
    started: () => {
        return {
            type: GETSUBJECT_STARTED
        }
    },  
    success: (data) => {
        return {
            type: GETSUBJECT_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: GETSUBJECT_FAILED,
            errors: error
        }
    }
  }

// export const GetMarksTableReducer = (state = initialState, action) => { 
//   let newState = state;

//   switch (action.type) {

//       case GETMARKS_TABLE_STARTED: {
//           newState = update.set(state, 'list.loading', true);
//           newState = update.set(newState, 'list.success', false);
//           newState = update.set(newState, 'list.failed', false);
//           break;
//       }
//       case GETMARKS_TABLE_SUCCESS: {
//           newState = update.set(state, 'list.loading', false);
//           newState = update.set(newState, 'list.failed', false);
//           newState = update.set(newState, 'list.success', true);
//           newState = update.set(newState, 'list.data', action.payload);         
//           break;
//       }
//       case GETMARKS_TABLE_SUCCESS: {
//           newState = update.set(state, 'list.loading', false);
//           newState = update.set(newState, 'list.success', false);
//           newState = update.set(newState, 'list.failed', true);
//           break;
//       }
//       default: {
//           return newState;
//       }
//   }

  
//   return newState;
// }

export const GetSubjectReducer = (state = initialState, action) => { 
    let newState = state;
  
    switch (action.type) {
  
        case GETSUBJECT_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GETSUBJECT_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.subject', action.payload);         
            break;
        }
        case GETSUBJECT_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        case GETMARKS_TABLE_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GETMARKS_TABLE_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.marks', action.payload);         
            break;
        }
        case GETMARKS_TABLE_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        default: {
            return newState;
        }
    }
  
    
    return newState;
  }