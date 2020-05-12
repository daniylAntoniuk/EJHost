import SeeStudentsCardsService from './SeeStudentsCardsService';
import update from '../../../helpers/update';
export const SEESTUDENTSCARDS_STARTED = "SEESTUDENTSCARDS_STARTED";
export const SEESTUDENTSCARDS_SUCCESS = "SEESTUDENTSCARDS_SUCCESS";
export const SEESTUDENTSCARDS_FAILED = "SEESTUDENTSCARDS_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const seeStudents = () => {
    return (dispatch) => {
        dispatch(getListActions.started());
        
        SeeStudentsCardsService.seeStudents()
            .then((response) => {
                console.log('response', response)
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
            type: SEESTUDENTSCARDS_STARTED
        }
    },  
    success: (data) => {
        return {
            type: SEESTUDENTSCARDS_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: SEESTUDENTSCARDS_FAILED,
            errors: error
        }
    }
  }

export const seestudentscardsReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case SEESTUDENTSCARDS_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case SEESTUDENTSCARDS_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case SEESTUDENTSCARDS_FAILED: {
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