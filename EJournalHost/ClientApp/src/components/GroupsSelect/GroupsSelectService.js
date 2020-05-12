import axios from "axios";
import {serverUrl} from '../../config';

export default class GroupsSelectService {
    static getGroupsSelect(specialityId) {
        return axios.get(`${serverUrl}api/StudyRoomHead/get/groupsBySpeciality/${specialityId}`)
    };
}