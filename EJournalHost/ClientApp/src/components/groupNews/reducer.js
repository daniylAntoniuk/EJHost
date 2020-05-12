import GroupNewsService from './GroupNewsService';
import update from '../../helpers/update';
export const NEWS_STARTED = "NEWS_STARTED";
export const NEWS_SUCCESS = "NEWS_SUCCESS";
export const NEWS_FAILED = "NEWS_FAILED";


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
        GroupNewsService.getNews()
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
            type: NEWS_STARTED
        }
    },  
    success: (data) => {
        return {
            type: NEWS_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: NEWS_FAILED,
            errors: error
        }
    }
  }

export const groupNewsReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case NEWS_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case NEWS_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case NEWS_FAILED: {
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