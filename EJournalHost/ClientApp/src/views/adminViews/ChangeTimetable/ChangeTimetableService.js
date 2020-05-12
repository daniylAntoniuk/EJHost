import axios from "axios";
import {serverUrl} from '../../../config';

export default class ChangeTimetableService {
    static getTeachers() {
        return axios.get(`${serverUrl}api/ChangeTimetable/get-teachers`)
    };
    static getGroups(model) {
        return axios.post(`${serverUrl}api/ChangeTimetable/get-groups`,model)
    };
    static getSubjects(model) {
        return axios.post(`${serverUrl}api/ChangeTimetable/get-subjects`,model)
    };
    static getAuditoriums(model) {
        return axios.post(`${serverUrl}api/ChangeTimetable/get-auditories`,model)
    };
    static save(model) {
        return axios.post(`${serverUrl}api/ChangeTimetable/save`,model)
    };
}