import axios from "axios";
import {serverUrl} from '../../../config';

export default class NewsService {
    static getNews() {
        return axios.get(`${serverUrl}api/student/news`)
    };
}