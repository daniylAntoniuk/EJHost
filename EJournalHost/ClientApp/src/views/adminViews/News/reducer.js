import NewsService from './NewsService';
import update from '../../../helpers/update';
export const NEWS_STARTED = "NEWS_STARTED";
export const NEWS_SUCCESS = "NEWS_SUCCESS";
export const NEWS_SUCCESS_GROUP = "NEWS_SUCCESS_GROUP";
export const NEWS_FAILED = "NEWS_FAILED";


const initialState = {
    list: {
        data: [],
        dataGroups: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getGroupNews = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        NewsService.getGroupNews(model)
            .then((response) => {
                dispatch(getListActions.successGroup(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err.response));
            });
    }
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
            type: NEWS_STARTED
        }
    },  
    success: (data) => {
        return {
            type: NEWS_SUCCESS,
            payload: data.data
        }
    },  
    successGroup: (data) => {
        return {
            type: NEWS_SUCCESS_GROUP,
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

export const adminNewsReducer = (state = initialState, action) => { 
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
      case NEWS_SUCCESS_GROUP: {
        newState = update.set(state, 'list.loading', false);
        newState = update.set(newState, 'list.failed', false);
        newState = update.set(newState, 'list.success', true);
        newState = update.set(newState, 'list.dataGroups', action.payload);         
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