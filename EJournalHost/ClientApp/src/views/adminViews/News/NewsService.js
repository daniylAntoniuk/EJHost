import axios from "axios";
import {serverUrl} from '../../../config';

export default class NewsService {
    static getGroupNews(model) {
        return axios.post(`${serverUrl}api/news/group-news`,model)
    };
    static getNews() {
        return axios.get(`${serverUrl}api/news/news`)
    };
}