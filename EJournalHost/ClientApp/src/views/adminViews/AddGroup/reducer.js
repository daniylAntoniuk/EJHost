import AddGroupService from './AddGroupService';
import update from '../../../helpers/update';
export const ADD_GROUP_STARTED = "ADD_GROUP_STARTED";
export const ADD_GROUP_SUCCESS = "ADD_GROUP_SUCCESS";
export const ADD_GROUP_FAILED = "ADD_GROUP_FAILED";

export const GET_SPEC_STARTED = "GET_SPEC_STARTED";
export const GET_SPEC_SUCCESS = "GET_SPEC_SUCCESS";
export const GET_SPEC_FAILED = "GET_SPEC_FAILED";

export const GET_CURATORS_STARTED = "GET_CURATORS_STARTED";
export const GET_CURATORS_SUCCESS = "GET_CURATORS_SUCCESS";
export const GET_CURATORS_FAILED = "GET_CURATORS_FAILED";

const initialState = {
    list: {
        specialities: [],
        curators:[],
        messageResult:{},
        errors:{},
        loading: false,
        success: false,
        failed: false,
    },
}

export const addGroup = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        AddGroupService.addGroup(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("err", err);
                dispatch(getListActions.failed(err));
            });
    }
}


export const getSpecialities = () => {
    return (dispatch) => {
        dispatch(getSpecialitiesListActions.started());
        AddGroupService.getSpecialities()
            .then((response) => {
                console.log("response", response);
                dispatch(getSpecialitiesListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("err", err);
                dispatch(getSpecialitiesListActions.failed(err));
            });
    }
}

export const getCurators = () => {
    return (dispatch) => {
        dispatch(getCuratorsListActions.started());
        AddGroupService.getCurators()
            .then((response) => {
                console.log("response", response);
                dispatch(getCuratorsListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("err", err);
                dispatch(getCuratorsListActions.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: ADD_GROUP_STARTED
        }
    },
    success: (data) => {
        return {
            type: ADD_GROUP_SUCCESS,
            addPayload:data.data
        }
    },
    failed: (error) => {
        return {
            type: ADD_GROUP_FAILED,
            payloadError:error
        }
    }
}

export const getSpecialitiesListActions = {
    started: () => {
        return {
            type: GET_SPEC_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_SPEC_SUCCESS,
            specPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_SPEC_FAILED,
            payloadError:error
        }
    }
}

export const getCuratorsListActions = {
    started: () => {
        return {
            type: GET_CURATORS_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_CURATORS_SUCCESS,
            curPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_CURATORS_FAILED,
            payloadError:error
        }
    }
}

export const addGroupReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case GET_SPEC_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case GET_SPEC_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.specialities', action.specPayload);
            newState = update.set(newState, 'list.errors', {});
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case GET_SPEC_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.payloadError);
            break;
        }
        case GET_CURATORS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case GET_CURATORS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.curators', action.curPayload);
            newState = update.set(newState, 'list.errors', {});
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case GET_CURATORS_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.payloadError);
            break;
        }
        case ADD_GROUP_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.messageResult', {});
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case ADD_GROUP_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.messageResult', action.addPayload);
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case ADD_GROUP_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.payloadError);
            newState = update.set(newState, 'list.messageResult', {});

            break;
        }
        default: {
            return newState;
        }
    }
    return newState;
}