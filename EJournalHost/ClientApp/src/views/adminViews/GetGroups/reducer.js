import GetGroupsService from './GetGroupsService';
import update from '../../../helpers/update';
export const GET_GROUPS_STARTED = "GET_GROUPS_STARTED";
export const GET_GROUPS_SUCCESS = "GET_GROUPS_SUCCESS";
export const GET_GROUPS_FAILED = "GET_GROUPS_FAILED";

export const GET_SPECIALITIES_STARTED = "GET_SPECIALITIES_STARTED";
export const GET_SPECIALITIES_SUCCESS = "GET_SPECIALITIES_SUCCESS";
export const GET_SPECIALITIES_FAILED = "GET_SPECIALITIES_FAILED";

export const GET_CURATORS_STARTED = "GET_CURATORS_STARTED";
export const GET_CURATORS_SUCCESS = "GET_CURATORS_SUCCESS";
export const GET_CURATORS_FAILED = "GET_CURATORS_FAILED";

export const DELETE_GROUP_STARTED = "DELETE_GROUP_STARTED";
export const DELETE_GROUP_SUCCESS = "DELETE_GROUP_SUCCESS";
export const DELETE_GROUP_FAILED = "DELETE_GROUP_FAILED";

export const EDIT_GROUP_STARTED = "EDIT_GROUP_STARTED";
export const EDIT_GROUP_SUCCESS = "EDIT_GROUP_SUCCESS";
export const EDIT_GROUP_FAILED = "EDIT_GROUP_FAILED";

const initialState = {
    list: {
        data: [],
        specialities: [],
        curators:[],
        errors:{},
        messageResult:{},
        loading: false,
        success: false,
        failed: false,
    },
}

export const getGroups = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        GetGroupsService.getGroups(model)
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
        GetGroupsService.getSpecialities()
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
        GetGroupsService.getCurators()
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

export const deleteGroup = (model) => {
    return (dispatch) => {
        dispatch(getDeleteListActions.started());
        GetGroupsService.deleteGroup(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getDeleteListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("err", err);
                dispatch(getDeleteListActions.failed(err));
            });
    }
}

export const editGroup = (model) => {
    return (dispatch) => {
        dispatch(getEditListActions.started());
        GetGroupsService.editGroup(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getEditListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("err", err);
                dispatch(getEditListActions.failed(err));
            });
    }
}
export const getListActions = {
    started: () => {
        return {
            type: GET_GROUPS_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_GROUPS_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_GROUPS_FAILED,
            payloadError:error
        }
    }
}
export const getSpecialitiesListActions = {
    started: () => {
        return {
            type: GET_SPECIALITIES_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_SPECIALITIES_SUCCESS,
            specPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_SPECIALITIES_FAILED,
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
            curatorsPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_CURATORS_FAILED,
            payloadError:error
        }
    }
}
export const getDeleteListActions = {
    started: () => {
        return {
            type: DELETE_GROUP_STARTED
        }
    },
    success: (data) => {
        return {
            type: DELETE_GROUP_SUCCESS,
            deletePayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: DELETE_GROUP_FAILED,
            payloadError:error
        }
    }
}
export const getEditListActions = {
    started: () => {
        return {
            type: EDIT_GROUP_STARTED
        }
    },
    success: (data) => {
        return {
            type: EDIT_GROUP_SUCCESS,
            editPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: EDIT_GROUP_FAILED,
            payloadError:error
        }
    }
}
export const getGroupsReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case GET_SPECIALITIES_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case GET_SPECIALITIES_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.specialities', action.specPayload);
            newState = update.set(newState, 'list.errors', {});
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case GET_SPECIALITIES_FAILED: {
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
            newState = update.set(newState, 'list.curators', action.curatorsPayload);
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
        case DELETE_GROUP_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.errors', {});
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case DELETE_GROUP_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.messageResult', action.deletePayload);
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case DELETE_GROUP_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.payloadError);
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case EDIT_GROUP_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case EDIT_GROUP_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.editPayload);
            newState = update.set(newState, 'list.data', action.editPayload);
            newState = update.set(newState, 'list.data', action.editPayload);
            newState = update.set(newState, 'list.messageResult', "success");
            break;
        }
        case EDIT_GROUP_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.payloadError);
            break;
        }
        case GET_GROUPS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.errors', {});
            break;
        }
        case GET_GROUPS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            newState = update.set(newState, 'list.errors', {});
            newState = update.set(newState, 'list.messageResult', {});
            break;
        }
        case GET_GROUPS_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            newState = update.set(newState, 'list.errors', action.payloadError);
            break;
        }
        default: {
            return newState;
        }
    }
    return newState;
}