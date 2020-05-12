import axios from "axios";
import {serverUrl} from '../../config';

export default class LoadDistributionDataService {
    static getData(model) {
        return axios.post(`${serverUrl}api/LoadDistribution/get-subjects`,model)
    };
    static changeTeacher(model) {
        return axios.post(`${serverUrl}api/LoadDistribution/change-teacher`,model)
    };
}