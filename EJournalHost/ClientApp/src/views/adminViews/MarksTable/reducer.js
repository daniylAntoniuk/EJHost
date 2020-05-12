import MarksTableService from './MarksTableService';
import update from '../../../helpers/update';
export const MARKS_TABLE_STARTED = "MARKS_TABLE_STARTED";
export const MARKS_TABLE_SUCCESS = "MARKS_TABLE_SUCCESS";
export const MARKS_TABLE_FAILED = "MARKS_TABLE_FAILED";

export const GET_SPEC_STARTED = "GET_SPEC_STARTED";
export const GET_SPEC_SUCCESS = "GET_SPEC_SUCCESS";
export const GET_SPEC_FAILED = "GET_SPEC_FAILED";

export const GET_GROUPS_STARTED = "GET_GROUPS_STARTED";
export const GET_GROUPS_SUCCESS = "GET_GROUPS_SUCCESS";
export const GET_GROUPS_FAILED = "GET_GROUPS_FAILED";

export const GET_LESSONS_STARTED = "GET_LESSONS_STARTED";
export const GET_LESSONS_SUCCESS = "GET_LESSONS_SUCCESS";
export const GET_LESSONS_FAILED = "GET_LESSONS_FAILED";

const initialState = {
    list: {
        data: [],
        specialities: [],
        groups: [],
        lessons: [],
        loading: false,
        success: false,
        failed: false,
    },
}

export const getMarks = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        MarksTableService.getMarks(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("error " + err);
                dispatch(getListActions.failed(err));
            });
    }
}
export const getSpecialities = () => {
    return (dispatch) => {
        dispatch(getSpecListActions.started());
        MarksTableService.getSpecialities()
            .then((response) => {
                console.log("response", response);
                dispatch(getSpecListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("error " + err);
                dispatch(getSpecListActions.failed(err));
            });
    }
}
export const getGroups = (model) => {
    return (dispatch) => {
        dispatch(getGroupListActions.started());
        MarksTableService.getGroups(model)
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
export const getLessons = (model) => {
    return (dispatch) => {
        dispatch(getLessonsListActions.started());
        MarksTableService.getLessons(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getLessonsListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("error " + err);
                dispatch(getLessonsListActions.failed(err));
            });
    }
}
export const getListActions = {
    started: () => {
        return {
            type: MARKS_TABLE_STARTED
        }
    },
    success: (data) => {
        return {
            type: MARKS_TABLE_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: MARKS_TABLE_FAILED,
            errors: error
        }
    }
}

export const getSpecListActions = {
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
            errors: error
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
export const getLessonsListActions = {
    started: () => {
        return {
            type: GET_LESSONS_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_LESSONS_SUCCESS,
            lessonPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_LESSONS_FAILED,
            errors: error
        }
    }
}
export const marksTableReducer = (state = initialState, action) => {
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
        case GET_LESSONS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_LESSONS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.lessons', action.lessonPayload);
            break;
        }
        case GET_LESSONS_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        case MARKS_TABLE_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case MARKS_TABLE_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case MARKS_TABLE_FAILED: {
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