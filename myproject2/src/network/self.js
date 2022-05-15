import { request } from "@/network/request.js";

export function getInfo(role, no) {
  return request({
    url: "/selfInfo",
    params: {
      role,
      no,
    },
  });
}

export function setInfo(no, name, password, type, updatePassword) {
  return request({
    url: "/setSelfInfo",
    method: "post",
    data: {
      no,
      name,
      password,
      type,
      updatePassword,
    },
  });
}
