import axios from 'axios';

import {AuthToken} from 'types/auth.type';
import {API_URL} from 'utils/constants';

const API = axios.create({
  baseURL: API_URL,
});

export const setTokenInAxiosInstance = ({accessToken}: AuthToken) => {
  API.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });
};

export default API;
