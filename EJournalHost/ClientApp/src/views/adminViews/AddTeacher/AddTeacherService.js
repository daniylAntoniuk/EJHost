import axios from "axios";
import {serverUrl} from '../../../config';

export default class AddTeacherService {
    static addTeacher(model) {
        return axios.post(`${serverUrl}api/admin/adduser`, model)
    };
    static getRoles() {
        return axios.get(`${serverUrl}api/admin/get/roles`)
    };
}