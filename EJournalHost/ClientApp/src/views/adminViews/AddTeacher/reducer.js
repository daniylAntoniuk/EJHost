import AddTeacherService from './AddTeacherService';
import update from '../../../helpers/update';
export const TEACHER_ADD_STARTED = "TEACHER_ADD_STARTED";
export const TEACHER_ADD_SUCCESS = "TEACHER_ADD_SUCCESS";
export const TEACHER_ADD_FAILED = "TEACHER_ADD_FAILED";

export const ROLES_GET_STARTED = "ROLES_GET_STARTED";
export const ROLES_GET_SUCCESS = "ROLES_GET_SUCCESS";
export const ROLES_GET_FAILED = "ROLES_GET_FAILED";
const initialState = {
    list: {
        roles: [],
        loading: false,
        success: false,
        failed: false,
    },
}

export const addTeacher = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        AddTeacherService.addTeacher(model)
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

export const getRoles = () => {
    return (dispatch) => {
        dispatch(getListActionsRoles.started());
        AddTeacherService.getRoles()
            .then((response) => {
                console.log("response", response);
                dispatch(getListActionsRoles.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("err", err);
                dispatch(getListActionsRoles.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: TEACHER_ADD_STARTED
        }
    },
    success: (data) => {
        return {
            type: TEACHER_ADD_SUCCESS
        }
    },
    failed: (error) => {
        return {
            type: TEACHER_ADD_FAILED
        }
    }
}

export const getListActionsRoles = {
    started: () => {
        return {
            type: ROLES_GET_STARTED
        }
    },
    success: (data) => {
        return {
            type: ROLES_GET_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: ROLES_GET_FAILED
        }
    }
}

export const addTeacherReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case ROLES_GET_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case ROLES_GET_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            //newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.roles', action.payload);
            break;
        }
        case ROLES_GET_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        case TEACHER_ADD_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case TEACHER_ADD_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            break;
        }
        case TEACHER_ADD_FAILED: {
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