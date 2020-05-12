import StudentsTableService from './StudentsTableService';
import update from '../../../helpers/update';
export const STUDENTS_TABLE_STARTED = "STUDENTS_TABLE_STARTED";
export const STUDENTS_TABLE_SUCCESS = "STUDENTS_TABLE_SUCCESS";
export const STUDENTS_TABLE_FAILED = "STUDENTS_TABLE_FAILED";

export const GET_SPEC_STARTED = "GET_SPEC_STARTED";
export const GET_SPEC_SUCCESS = "GET_SPEC_SUCCESS";
export const GET_SPEC_FAILED = "GET_SPEC_FAILED";

export const GET_GROUPS_STARTED = "GET_GROUPS_STARTED";
export const GET_GROUPS_SUCCESS = "GET_GROUPS_SUCCESS";
export const GET_GROUPS_FAILED = "GET_GROUPS_FAILED";

const initialState = {
    list: {
        data: [],
        specialities: [],
        groups: [],
        loading: false,
        success: false,
        failed: false,
    },
}

export const getStudents = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        StudentsTableService.getStudents(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err));
            });
    }
}

export const getSpecialities = () => {
    return (dispatch) => {
        dispatch(getSpecialitiesListActions.started());
        StudentsTableService.getSpecialities()
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
export const getGroups = (model) => {
    return (dispatch) => {
        dispatch(getGroupListActions.started());
        StudentsTableService.getGroups(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getGroupListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("error " + err);
                dispatch(getGroupListActions.failed(err));
            });
    }
}
export const getListActions = {
    started: () => {
        return {
            type: STUDENTS_TABLE_STARTED
        }
    },
    success: (data) => {
        return {
            type: STUDENTS_TABLE_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: STUDENTS_TABLE_FAILED,
            errors: error
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
            payloadError: error
        }
    }
}
export const getGroupListActions = {
    started: () => {
        return {
            type: GET_GROUPS_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_GROUPS_SUCCESS,
            groupPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_GROUPS_FAILED,
            errors: error
        }
    }
}
export const studentTableReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case GET_SPEC_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_SPEC_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.specialities', action.specPayload);
            break;
        }
        case GET_SPEC_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        case GET_GROUPS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_GROUPS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.groups', action.groupPayload);
            break;
        }
        case GET_GROUPS_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        case STUDENTS_TABLE_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case STUDENTS_TABLE_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case STUDENTS_TABLE_FAILED: {
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