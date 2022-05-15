import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8081",
    timeout: 5000,
  });
  return instance(config);
}

export function stuRequest(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8081/student",
    timeout: 5000,
  });
  return instance(config);
}

export function teaRequest(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8081/teacher",
    timeout: 5000,
  });
  return instance(config);
}

export function admRequest(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8081/admin",
    timeout: 5000,
  });
  return instance(config);
}
