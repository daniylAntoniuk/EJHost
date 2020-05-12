import HomeworkService from './HomeworkService';
import update from '../../../helpers/update';
export const HOMEWORK_STARTED = "HOMEWORK_STARTED";
export const HOMEWORK_SUCCESS = "HOMEWORK_SUCCESS";
export const HOMEWORK_FAILED = "HOMEWORK_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        HomeworkService.getData(model)
            .then((response) => {
                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: HOMEWORK_STARTED
        }
    },  
    success: (data) => {
        return {
            type: HOMEWORK_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: HOMEWORK_FAILED,
            errors: error
        }
    }
  }

export const homeworkReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case HOMEWORK_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case HOMEWORK_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case HOMEWORK_FAILED: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', true);
          newState = update.set(newState, "list.errors", action.errors);
          break;
      }
      default: {
          return newState;
      }
  }
  return newState;
}