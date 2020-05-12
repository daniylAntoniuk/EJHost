import SetMarksService from './SetMarksService';
import update from '../../../helpers/update';
export const MARKS_STARTED = "MARKS_STARTED";
export const MARKS_SUCCESS = "MARKS_SUCCESS";
export const MARKS_SUCCESS_STD = "MARKS_SUCCESS_STD";
export const MARKS_SUCCESS_CHANGE = "MARKS_SUCCESS_CHANGE";
export const MARKS_FAILED = "MARKS_FAILED";


const initialState = {
    list: {
        data: [],
        students: [],
        loading: false,
        success: false,
        failed: false,
    },
}

export const getData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        SetMarksService.getData(model)
            .then((response) => {
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err.response));
            });
    }
}
export const getStudents = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        SetMarksService.getStudents(model)
            .then((response) => {
                dispatch(getListActions.successStudents(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err.response));
            });
    }
}
export const changeTopic = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        SetMarksService.changeTopic(model)
        .then((response) => {
                dispatch(getListActions.successStudents(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err.response));
            });
    }
}
export const changeHomework = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        SetMarksService.changeHomework(model)
        .then((response) => {
                dispatch(getListActions.successStudents(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err.response));
            });
    }
}
export const changeMark = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        SetMarksService.changeMark(model)
        .then((response) => {
                dispatch(getListActions.successStudents(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err.response));
            });
    }
}
export const changeIsPresent = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        SetMarksService.changeIsPresent(model)
        .then((response) => {
                dispatch(getListActions.successStudents(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err.response));
            });
    }
}
export const getListActions = {
    started: () => {
        return {
            type: MARKS_STARTED
        }
    },
    success: (data) => {
        return {
            type: MARKS_SUCCESS,
            payload: data.data
        }
    },
    successStudents: (data) => {
        //console.log("DADADADAData",data);
        return {
            type: MARKS_SUCCESS_STD,
            payload: data.data
        }
    },
    successChange: () => {
        return {
            type: MARKS_SUCCESS_CHANGE,
        }
    },
    failed: (error) => {
        return {
            type: MARKS_FAILED,
            errors: error
        }
    }
}

export const setMarksReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {

        case MARKS_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case MARKS_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case MARKS_SUCCESS_STD: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.students', action.payload);
            break;
        }
        case MARKS_SUCCESS_CHANGE: {
            //newState = update.set(state, 'list.loading', false);
            //newState = update.set(newState, 'list.failed', false);
            //newState = update.set(newState, 'list.success', true);
            break;
        }
        case MARKS_FAILED: {
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