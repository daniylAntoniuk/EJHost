import TimeTableService from './TimeTableService';
import update from '../../../helpers/update';
export const TIMETABLE_STARTED = "TIMETABLE_STARTED";
export const TIMETABLE_SUCCESS = "TIMETABLE_SUCCESS";
export const TIMETABLE_FAILED = "TIMETABLE_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getTimetable = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        
        TimeTableService.getTimetable(model)
            .then((response) => {

                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: TIMETABLE_STARTED
        }
    },  
    success: (data) => {
        return {
            type: TIMETABLE_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: TIMETABLE_FAILED,
            errors: error
        }
    }
  }

export const timetableReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case TIMETABLE_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case TIMETABLE_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case TIMETABLE_FAILED: {
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