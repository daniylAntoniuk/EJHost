import AddStudentService from './AddStudentService';
import update from '../../../helpers/update';
export const STUDENT_ADD_STARTED = "STUDENT_ADD_STARTED";
export const STUDENT_ADD_SUCCESS = "STUDENT_ADD_SUCCESS";
export const STUDENT_ADD_FAILED = "STUDENT_ADD_FAILED";
export const GET_GROUPS_STARTED = "GET_GROUPS_STARTED";
export const GET_GROUPS_SUCCESS = "GET_GROUPS_SUCCESS";
export const GET_GROUPS_FAILED = "GET_GROUPS_FAILED";

const initialState = {
    list: {
        groups: [],
        loading: false,
        success: false,
        failed: false,
    },
}

export const addStudent = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        AddStudentService.addStudent(model)
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


export const getGroups = () => {
    return (dispatch) => {
        dispatch(getGroupsListActions.started());
        AddStudentService.getGroups()
            .then((response) => {
                console.log("response", response);
                dispatch(getGroupsListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("err", err);
                dispatch(getGroupsListActions.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: STUDENT_ADD_STARTED
        }
    },
    success: (data) => {
        return {
            type: STUDENT_ADD_SUCCESS
        }
    },
    failed: (error) => {
        return {
            type: STUDENT_ADD_FAILED
        }
    }
}

export const getGroupsListActions = {
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
            type: GET_GROUPS_FAILED
        }
    }
}

export const addStudentReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case GET_GROUPS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_GROUPS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            //newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.groups', action.payload);
            break;
        }
        case GET_GROUPS_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        case STUDENT_ADD_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case STUDENT_ADD_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            break;
        }
        case STUDENT_ADD_FAILED: {
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