import { API_BASE_URL, API_PATHS } from './constants';
import axios from 'axios';

export const getBooks = (page = 1, itemsPerPage = 20, filters = []) => {
    const params = { page, itemsPerPage, filters };
    return axios.post(`${API_BASE_URL}${API_PATHS.BOOKS}`, params)
        .then(function (response) {
            // handle success
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log('error getting' + error);
            return null;
        })
}
