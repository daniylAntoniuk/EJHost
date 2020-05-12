import axios from "axios";
import {serverUrl} from '../../config';

export default class ProfileService {
    static getProfile() {
        return axios.get(`${serverUrl}api/auth/profile`)
    };
}