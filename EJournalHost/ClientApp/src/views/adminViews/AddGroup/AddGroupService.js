import axios from "axios";
import {serverUrl} from '../../../config';

export default class AddGroupService {
    static addGroup(model) {
        return axios.post(`${serverUrl}api/admin/add/group`, model)
    };
    static getCurators() {
        return axios.get(`${serverUrl}api/admin/get/curators`)
    };
    static getSpecialities() {
        return axios.get(`${serverUrl}api/admin/get/specialities`)
    };
}