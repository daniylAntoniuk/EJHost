import AddNewsService from './AddNewsService';
import update from '../../../helpers/update';
export const NEWS_ADD_STARTED = "NEWS_ADD_STARTED";
export const NEWS_ADD_SUCCESS = "NEWS_ADD_SUCCESS";
export const NEWS_ADD_FAILED = "NEWS_ADD_FAILED";


const initialState = {
    list: {
        loading: false,
        success: false,
        failed: false,
    },   
}

export const addNews = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        AddNewsService.addNews(model)
            .then((response) => {
                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
                console.log("err", err);
              dispatch(getListActions.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: NEWS_ADD_STARTED
        }
    },  
    success: (data) => {
        return {
            type: NEWS_ADD_SUCCESS
        }
    },  
    failed: (error) => {
        return {           
            type: NEWS_ADD_FAILED
        }
    }
  }

export const addNewsReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case NEWS_ADD_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case NEWS_ADD_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          break;
      }
      case NEWS_ADD_FAILED: {
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