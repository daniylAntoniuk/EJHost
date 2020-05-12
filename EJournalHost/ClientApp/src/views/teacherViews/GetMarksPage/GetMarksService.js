import axios from "axios";
import {serverUrl} from '../../../config';

export default class GetMarksService {
    static getMarks(model) {
        return axios.post(`${serverUrl}api/marks/teacher/getmarks`, model)
    };

    static getSubject(){
        return axios.get(`${serverUrl}api/marks/teacher/getsubject`);
    };
}