import axios from "axios";
import {serverUrl} from '../../../config';

export default class TeacherTimeTableService {
    static getLessons(model) {
        console.log('AAAAAAAAAAAAAAAAAAAAA');
        return axios.post(`${serverUrl}api/getLessons/get/timetable`, model)
    };
}