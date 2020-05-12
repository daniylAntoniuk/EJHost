import axios from "axios";
import {serverUrl} from '../../../config';

export default class StudentViewService {
    static getStudentsBySpeciality(model) {
        return axios.get(`${serverUrl}api/StudyRoomHead/get/studentsBySpeciality/specialityId=${model.specialityId}`)
    };
    static getAllStudentsBySpecialities() {
        return axios.get(`${serverUrl}api/StudyRoomHead/get/allStudentsBySpeciality`)
    };
    static getSpecialities() {
        return axios.get(`${serverUrl}api/StudyRoomHead/get/specialitiesByStudyRoomHead`)        
    };
    static getGroupsBySpeciality(model){
        return axios.get(`${serverUrl}api/StudyRoomHead/get/groupsBySpeciality/specialityId=${model.specialityId}`)        
    };
    static getStudentsByGroup(model){
        return axios.get(`${serverUrl}api/StudyRoomHead/get/studentsByGroup/groupId=${model.groupId}`)
    };
}