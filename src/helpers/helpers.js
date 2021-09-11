import axios from "axios";
import { config } from "../config";

export function makeBaseReq() {
  const base = axios.create({
    baseURL: config.baseURL,
    withCredentials: true,
  });
  return base;
}
