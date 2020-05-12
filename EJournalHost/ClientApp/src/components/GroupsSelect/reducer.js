import GroupsSelectService from './GroupsSelectService';
import update from '../../helpers/update';

export const GROUPS_SELECT_STARTED = "GROUPS_SELECT_STARTED";
export const GROUPS_SELECT_SUCCESS = "GROUPS_SELECT_SUCCESS";
export const GROUPS_SELECT_FAILED = "GROUPS_SELECT_FAILED";

export const getListActions = {
    started: () => {
        return {
            type: GROUPS_SELECT_STARTED
        }
    },  
    success: (data) => {
        return {
            type: GROUPS_SELECT_SUCCESS,
            payload: data.data
        }
    },  
    failed: (error) => {
        return {           
            type: GROUPS_SELECT_FAILED,
            errors: error
        }
    }
}

const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getGroupsSelect = (specialityId) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        GroupsSelectService.getGroupsSelect(specialityId)
            .then((response) => {
                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err));
            });
    }
}

export const groupsSelectReducer = (state = initialState, action) => { 
    let newState = state;
  
    switch (action.type) {

        case GROUPS_SELECT_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GROUPS_SELECT_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);         
            break;
        }
        case GROUPS_SELECT_FAILED: {
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