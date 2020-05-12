import NewsService from './NewsService';
import update from '../../../helpers/update';
export const HOME_STARTED = "HOME_STARTED";
export const HOME_SUCCESS = "HOME_SUCCESS";
export const HOME_FAILED = "HOME_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getNews = () => {
    return (dispatch) => {
        dispatch(getListActions.started());
        NewsService.getNews()
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
            type: HOME_STARTED
        }
    },  
    success: (data) => {
        return {
            type: HOME_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: HOME_FAILED,
            errors: error
        }
    }
  }

export const newsReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case HOME_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case HOME_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case HOME_FAILED: {
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