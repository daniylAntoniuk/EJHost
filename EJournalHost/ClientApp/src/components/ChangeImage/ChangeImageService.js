import axios from "axios";
import {serverUrl} from '../../config';

export default class ChangeImageService {
    static getImage() {       
        return axios.get(`${serverUrl}api/account/get-image`)
    };
    static changeImage(model) {       
        return axios.post(`${serverUrl}api/account/change-image`, model)
    };
}