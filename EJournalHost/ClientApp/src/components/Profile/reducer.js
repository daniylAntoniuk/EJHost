import ProfileService from './ProfileService';
import update from '../../helpers/update';
export const PROFILE_STARTED = "PROFILE_STARTED";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILED = "PROFILE_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getProfile = () => {
    return (dispatch) => {
        dispatch(getListActions.started());
        ProfileService.getProfile()
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
            type: PROFILE_STARTED
        }
    },  
    success: (data) => {
        return {
            type: PROFILE_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: PROFILE_FAILED,
            errors: error
        }
    }
  }

export const profileReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case PROFILE_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case PROFILE_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case PROFILE_FAILED: {
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