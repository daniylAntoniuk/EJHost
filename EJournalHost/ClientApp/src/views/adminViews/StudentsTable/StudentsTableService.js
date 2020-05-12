import axios from "axios";
import {serverUrl} from '../../../config';

export default class StudentsTableService {
    static getStudents(model) {
        return axios.get(`${serverUrl}api/admin/get/students/groupId=${model.groupId}`)
    };
    static getSpecialities() {
        return axios.get(`${serverUrl}api/admin/get/specialities`)
    };
    static getGroups(model) {
        return axios.post(`${serverUrl}api/admin/get/groups/dropdown`,model)
    };
}