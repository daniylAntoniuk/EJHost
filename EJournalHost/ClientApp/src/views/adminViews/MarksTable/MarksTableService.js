import axios from "axios";
import {serverUrl} from '../../../config';

export default class MarksTableService {
    static getMarks(model) {
        return axios.post(`${serverUrl}api/admin/get/marks`, model)
    };
    static getSpecialities() {
        return axios.get(`${serverUrl}api/admin/get/specialities`)
    };
    static getGroups(model) {
        return axios.post(`${serverUrl}api/admin/get/groups/dropdown`,model)
    };
    static getLessons(model) {
        return axios.post(`${serverUrl}api/admin/get/lessons`,model)
    };
}