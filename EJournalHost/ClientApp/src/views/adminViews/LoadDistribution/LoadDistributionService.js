import axios from "axios";
import {serverUrl} from '../../../config';

export default class LoadDistributionService {
    static getGroups(model) {
        return axios.post(`${serverUrl}api/LoadDistribution/get-spec`,model)
    };
}