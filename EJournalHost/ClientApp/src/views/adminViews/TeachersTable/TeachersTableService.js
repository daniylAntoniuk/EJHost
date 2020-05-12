import axios from "axios";
import {serverUrl} from '../../../config';

export default class TeachersTableService {
    static getTeachers(model) {
        return axios.post(`${serverUrl}api/admin/get/teachers`, model)
    };
    static getRoles() {
        return axios.get(`${serverUrl}api/admin/get/roles`)
    };
}