import { apiBaseUrl } from "./constants/constants";
import axios from 'axios'


const instance = axios.create({
  baseURL: apiBaseUrl,
  
});

export default instance