import { stuRequest } from "@/network/request.js";

// 学生首页中各个功能模块的请求
export function getStuNews(sno) {
  return stuRequest({
    url: "/news",
    params: {
      sno: sno,
    },
  });
}

export function getStuHomework(sno) {
  return stuRequest({
    url: "/homework",
    params: {
      sno: sno,
    },
  });
}

export function getStuDiscussion(sno) {
  return stuRequest({
    url: "/discussion",
    params: {
      sno: sno,
    },
  });
}

export function getStuMistake(sno) {
  return stuRequest({
    url: "/mistake",
    params: {
      sno: sno,
    },
  });
}

export function getStuResource(sno) {
  return stuRequest({
    url: "/resource",
    params: {
      sno: sno,
    },
  });
}

// 学生二级页面的请求
// 作业习题
export function getStuHomeworkQue(hno, sno) {
  return stuRequest({
    url: "/homeworkQuestion",
    params: {
      hno,
      sno,
    },
  });
}

// 提交作业
export function submitStuAns(obj) {
  return stuRequest({
    url: "/submitStuAns",
    method: "post",
    data: {
      obj,
    },
  });
}

// 讨论详情
export function getStuDisDetail(dno, sno) {
  return stuRequest({
    url: "/disDetail",
    params: {
      dno,
      sno,
    },
  });
}

// 发布讨论
export function submitStuDis(sno, dno, content) {
  return stuRequest({
    url: "/newDis",
    method: "post",
    data: {
      sno,
      dno,
      content,
    },
  });
}

// 某个科目的错题
export function getStuMis(sno, cno) {
  return stuRequest({
    url: "/misDetail",
    params: {
      sno,
      cno,
    },
  });
}

// 查看某个班级的资源
export function getStuRes(cno) {
  return stuRequest({
    url: "/resDetail",
    params: {
      cno,
    },
  });
}
