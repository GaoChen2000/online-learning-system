import { request } from "@/network/request.js";

// 登录
export function login(name, password, role) {
  return request({
    url: "/login",
    method: "post",
    data: {
      name,
      password,
      role,
    },
  });
}

// 注册
export function register(form) {
  return request({
    url: "/register",
    method: "post",
    data: {
      form,
    },
  });
}
