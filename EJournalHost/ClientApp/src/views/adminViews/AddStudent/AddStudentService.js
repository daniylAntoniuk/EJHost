import axios from "axios";
import {serverUrl} from '../../../config';

export default class AddStudentService {
    static addStudent(model) {
        return axios.post(`${serverUrl}api/admin/adduser`, model)
    };
    static getGroups() {
        return axios.get(`${serverUrl}api/admin/get/shortgroups`)
    };
}