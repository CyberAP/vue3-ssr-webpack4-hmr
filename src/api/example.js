import axios from "axios";
import { APP_BASE_URL } from "../config.js";

export const getExampleData = () => {
  return axios.get(`${APP_BASE_URL}/example`);
};
