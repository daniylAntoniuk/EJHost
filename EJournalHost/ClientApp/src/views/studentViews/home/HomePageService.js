import axios from "axios";
import {serverUrl} from '../../../config';

export default class HomePageService {
    static getData() {
        return axios.get(`${serverUrl}api/student/homepage`)
    };
}