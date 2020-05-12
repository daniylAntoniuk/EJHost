import LoadDistributionDataService from './LoadDistributionDataService';
import update from '../../helpers/update';
export const LOADDISTRIBUTIONDATA_STARTED = "LOADDISTRIBUTIONDATA_STARTED";
export const LOADDISTRIBUTIONDATA_SUCCESS = "LOADDISTRIBUTIONDATA_SUCCESS";
export const LOADDISTRIBUTIONDATA_SUCCESS_GROUPS = "LOADDISTRIBUTIONDATA_SUCCESS_GROUPS";
export const LOADDISTRIBUTIONDATA_SUCCESS_CHANGE = "LOADDISTRIBUTIONDATA_SUCCESS_CHANGE";
export const LOADDISTRIBUTIONDATA_FAILED = "LOADDISTRIBUTIONDATA_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        successChange: false,
        failed: false,
    },
}

export const getData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        LoadDistributionDataService.getData(model)
            .then((response) => {
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err.response));
            });
    }
}
export const changeTeacher = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        LoadDistributionDataService.changeTeacher(model)
            .then((response) => {
                dispatch(getListActions.successChange(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err.response));
            });
    }
}
export const getListActions = {
    started: () => {
        return {
            type: LOADDISTRIBUTIONDATA_STARTED
        }
    },
    success: (data) => {
        return {
            type: LOADDISTRIBUTIONDATA_SUCCESS,
            payload: data.data
        }
    },
    successChange: () => {
        return {
            type: LOADDISTRIBUTIONDATA_SUCCESS_CHANGE,
        }
    },
    successGroups: (data) => {
        return {
            type: LOADDISTRIBUTIONDATA_SUCCESS_GROUPS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: LOADDISTRIBUTIONDATA_FAILED,
            errors: error
        }
    }
}

export const loadDistributionDataReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {

        case LOADDISTRIBUTIONDATA_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case LOADDISTRIBUTIONDATA_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case LOADDISTRIBUTIONDATA_SUCCESS_CHANGE: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.successChange', true);
            break;
        }
        case LOADDISTRIBUTIONDATA_FAILED: {
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