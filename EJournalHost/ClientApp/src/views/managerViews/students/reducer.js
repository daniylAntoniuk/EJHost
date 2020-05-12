import StudentViewService from './StudentViewService';
import update from '../../../helpers/update';

export const GET_ALLSTUDENTSBYSPECIALITIES_STARTED = "GET_ALLSTUDENTSBYSPECIALITIES_STARTED";
export const GET_ALLSTUDENTSBYSPECIALITIES_SUCCESS = "GET_ALLSTUDENTSBYSPECIALITIES_SUCCESS";
export const GET_ALLSTUDENTSBYSPECIALITIES_FAILED = "GET_ALLSTUDENTSBYSPECIALITIES_FAILED";

export const GET_SPECIALITIES_STARTED = "GET_SPECIALITIES_STARTED";
export const GET_SPECIALITIES_SUCCESS = "GET_SPECIALITIES_SUCCESS";
export const GET_SPECIALITIES_FAILED = "GET_SPECIALITIES_FAILED";

export const GET_STUDENTSBYSPECIALITY_STARTED = "GET_STUDENTSBYSPECIALITY_STARTED";
export const GET_STUDENTSBYSPECIALITY_SUCCESS = "GET_STUDENTSBYSPECIALITY_SUCCESS";
export const GET_STUDENTSBYSPECIALITY_FAILED = "GET_STUDENTSBYSPECIALITY_FAILED";

export const GET_GROUPSBYSPECIALITY_STARTED = "GET_GROUPSBYSPECIALITY_STARTED";
export const GET_GROUPSBYSPECIALITY_SUCCESS = "GET_GROUPSBYSPECIALITY_SUCCESS";
export const GET_GROUPSBYSPECIALITY_FAILED = "GET_GROUPSBYSPECIALITY_FAILED";

export const GET_STUDENTSBYGROUP_STARTED = "GET_STUDENTSBYGROUP_STARTED";
export const GET_STUDENTSBYGROUP_SUCCESS = "GET_STUDENTSBYGROUP_SUCCESS";
export const GET_STUDENTSBYGROUP_FAILED = "GET_STUDENTSBYGROUP_FAILED";

const initialState = {
    list: {
        students: [],
        specialities: [],
        groups: [],
        loading: false,
        success: false,
        failed: false,
    },
}

export const getAllStudentsBySpecialities = () => {
    return (dispatch) => {
        dispatch(getAllStudentsBySpecialitiesListActions.started());
        StudentViewService.getAllStudentsBySpecialities()
            .then((response) => {
                console.log("response", response);
                dispatch(getAllStudentsBySpecialitiesListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getAllStudentsBySpecialitiesListActions.failed(err));
            }
        );
    }
}

export const getSpecialities = () => {
    return (dispatch) => {
        dispatch(getSpecialitiesListActions.started());
        StudentViewService.getSpecialities()
            .then((response) => {
                console.log("response", response);
                dispatch(getSpecialitiesListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getSpecialitiesListActions.failed(err));
            }
        );
    }
}

export const getStudentsBySpeciality = (model) => {
    return (dispatch) => {
        dispatch(getStudentsBySpecialityListActions.started());
        StudentViewService.getStudentsBySpeciality(model)
            .then((response) => {
                console.log("students response", response);
                dispatch(getStudentsBySpecialityListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getStudentsBySpecialityListActions.failed(err));
            }
        );
    }
}

export const getGroupsBySpeciality = (model) => {
    return (dispatch) => {
        dispatch(getGroupsBySpecialityListActions.started());
        StudentViewService.getGroupsBySpeciality(model)
            .then((response) => {
                console.log("groups response", response);
                dispatch(getGroupsBySpecialityListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("error " + err);
                dispatch(getGroupsBySpecialityListActions.failed(err));
            }
        );
    }
}

export const getStudentsByGroup = (model) => {
    return (dispatch) => {
        dispatch(getStudentsByGroupListActions.started());
        StudentViewService.getStudentsByGroup(model)
            .then((response) => {
                console.log("response", response);
                dispatch(getStudentsByGroupListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getStudentsByGroupListActions.failed(err));
            }
        );
    }
}

export const getAllStudentsBySpecialitiesListActions = {
    started: () => {
        return {
            type: GET_ALLSTUDENTSBYSPECIALITIES_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_ALLSTUDENTSBYSPECIALITIES_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_ALLSTUDENTSBYSPECIALITIES_FAILED,
            errors: error
        }
    }
}

export const getStudentsBySpecialityListActions = {
    started: () => {
        return {
            type: GET_STUDENTSBYSPECIALITY_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_STUDENTSBYSPECIALITY_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_STUDENTSBYSPECIALITY_FAILED,
            errors: error
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
            payloadError: error
        }
    }
}

export const getGroupsBySpecialityListActions = {
    started: () => {
        return {
            type: GET_GROUPSBYSPECIALITY_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_GROUPSBYSPECIALITY_SUCCESS,
            groupPayload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_GROUPSBYSPECIALITY_FAILED,
            errors: error
        }
    }
}

export const getStudentsByGroupListActions = {
    started: () => {
        return {
            type: GET_STUDENTSBYGROUP_STARTED
        }
    },
    success: (data) => {
        return {
            type: GET_STUDENTSBYGROUP_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: GET_STUDENTSBYGROUP_FAILED,
            errors: error
        }
    }
}

export const studentViewReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case GET_SPECIALITIES_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_SPECIALITIES_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.specialities', action.specPayload);
            break;
        }
        case GET_SPECIALITIES_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }

        case GET_GROUPSBYSPECIALITY_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_GROUPSBYSPECIALITY_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.groups', action.groupPayload);
            break;
        }
        case GET_GROUPSBYSPECIALITY_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }

        case GET_ALLSTUDENTSBYSPECIALITIES_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_ALLSTUDENTSBYSPECIALITIES_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.students', action.payload);
            break;
        }
        case GET_ALLSTUDENTSBYSPECIALITIES_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }

        case GET_STUDENTSBYSPECIALITY_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_STUDENTSBYSPECIALITY_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.students', action.payload);
            break;
        }
        case GET_STUDENTSBYSPECIALITY_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }

        case GET_STUDENTSBYGROUP_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case GET_STUDENTSBYGROUP_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.students', action.payload);
            break;
        }
        case GET_STUDENTSBYGROUP_FAILED: {
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