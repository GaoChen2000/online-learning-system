import { admRequest } from "./request";

// 管理员首页各个功能模块的请求
// 管理班级页面，获得所有班级
export function getAllClass() {
  return admRequest({
    url: "/getAllClass",
  });
}

// 讨论区，获得所有讨论
export function getAllDis() {
  return admRequest({
    url: "/getAllDis",
  });
}

// 管理员的二级页面的请求
// 某个讨论区详情
export function getDisDetail(dno) {
  return admRequest({
    url: "/getDisDetail",
    params: {
      dno,
    },
  });
}

// 删除评论
export function AdmDeleteCom(comno) {
  return admRequest({
    url: "/deleteCom",
    params: {
      comno,
    },
  });
}
