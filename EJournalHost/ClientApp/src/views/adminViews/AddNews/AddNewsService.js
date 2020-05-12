import axios from "axios";
import {serverUrl} from '../../../config';

export default class AddNewsService {
    static addNews(model) {
        return axios.post(`${serverUrl}api/news/add-news`, model)
    };
}