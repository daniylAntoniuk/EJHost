import axios from "axios";
import {serverUrl} from '../../../config';

export default class SeeStudentsService {
    static seeStudents() {
       
        return axios.get(`${serverUrl}api/Students/get/students`)
    };
}