import axios from "axios";
import {serverUrl} from '../../../config';

export default class SetMarksService {
    static getData(model) {
        return axios.post(`${serverUrl}api/SetMarks/get-lessons`,model)
    };
    static getStudents(model) {
        return axios.post(`${serverUrl}api/SetMarks/get-students`,model)
    };
    static changeTopic(model) {
        return axios.post(`${serverUrl}api/SetMarks/change-topic`,model)
    };
    static changeHomework(model) {
        return axios.post(`${serverUrl}api/SetMarks/change-homework`,model)
    };
    static changeMark(model) {
        return axios.post(`${serverUrl}api/SetMarks/change-mark`,model)
    };
    static changeIsPresent(model) {
        return axios.post(`${serverUrl}api/SetMarks/change-ispresent`,model)
    };
}