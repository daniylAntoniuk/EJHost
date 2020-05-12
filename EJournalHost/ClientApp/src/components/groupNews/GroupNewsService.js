import axios from "axios";
import {serverUrl} from '../../config';

export default class GroupNewsService {
    static getNews() {
        return axios.get(`${serverUrl}api/student/group-news`)
    };f
}