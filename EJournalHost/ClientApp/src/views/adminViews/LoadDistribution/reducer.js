import LoadDistributionService from './LoadDistributionService';
import update from '../../../helpers/update';
export const LOADDISTRIBUTION_STARTED = "LOADDISTRIBUTION_STARTED";
export const LOADDISTRIBUTION_SUCCESS = "LOADDISTRIBUTION_SUCCESS";
export const LOADDISTRIBUTION_SUCCESS_GROUPS = "LOADDISTRIBUTION_SUCCESS_GROUPS";
export const LOADDISTRIBUTION_FAILED = "LOADDISTRIBUTION_FAILED";


const initialState = {
    list: {
        data: [],
        groups: null,
        loading: false,
        success: false,
        failed: false,
    },
}

export const getGroups = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        LoadDistributionService.getGroups(model)
            .then((response) => {
                dispatch(getListActions.successGroups(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err.response));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: LOADDISTRIBUTION_STARTED
        }
    },
    success: (data) => {
        return {
            type: LOADDISTRIBUTION_SUCCESS,
            payload: data.data
        }
    },
    successGroups: (data) => {
        return {
            type: LOADDISTRIBUTION_SUCCESS_GROUPS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: LOADDISTRIBUTION_FAILED,
            errors: error
        }
    }
}

export const loadDistributionReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {

        case LOADDISTRIBUTION_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case LOADDISTRIBUTION_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case LOADDISTRIBUTION_SUCCESS_GROUPS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.groups', action.payload);
            break;
        }
        case LOADDISTRIBUTION_FAILED: {
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