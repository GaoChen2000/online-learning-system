import { teaRequest } from "./request";

// 老师首页中各个功能模块的请求
export function getTeaHomework(tno) {
  return teaRequest({
    url: "/homework",
    params: {
      tno,
    },
  });
}

export function getTeaNews(tno) {
  return teaRequest({
    url: "/news",
    params: {
      tno,
    },
  });
}

export function getTeaReview(tno) {
  return teaRequest({
    url: "/review",
    params: {
      tno,
    },
  });
}

export function getTeaDis(tno) {
  return teaRequest({
    url: "/discussion",
    params: {
      tno,
    },
  });
}

export function getTeaQue(tno) {
  return teaRequest({
    url: "/questions",
    params: {
      tno,
    },
  });
}

export function getTeaRes(tno) {
  return teaRequest({
    url: "/resource",
    params: {
      tno,
    },
  });
}

export function getTeaAna(tno) {
  return teaRequest({
    url: "/analysis",
    params: {
      tno,
    },
  });
}

// 老师的二级页面
// 查看某个作业详情
export function getTeaHomeworkDetail(hno) {
  return teaRequest({
    url: "/TeaHomeworkDetail",
    params: {
      hno,
    },
  });
}

// 创建作业页面，获得所有班级
// 创建公告页面，获得所有班级
// 创建讨论题页面，获得所有班级
export function getAllClass(tno) {
  return teaRequest({
    url: "/allClass",
    params: {
      tno,
    },
  });
}

// 创建作业页面，根据 chosenQueArr 获得 题目详情
export function newHomeworkQuestionArr(chosenQueArr) {
  return teaRequest({
    url: "/chosenQueArr",
    method: "post",
    data: {
      chosenQueArr,
    },
  });
}

// 提交创建作业的信息，发布作业
export function newHomeworkSubmit(form, cname, tno) {
  return teaRequest({
    url: "/newHomeworkSubmit",
    method: "post",
    data: {
      form,
      cname,
      tno,
    },
  });
}

// 发布公告
export function newNewsSubmit(form, tno, cname) {
  return teaRequest({
    url: "/newNewsSubmit",
    method: "post",
    data: {
      form,
      tno,
      cname,
    },
  });
}

// 作业评分页面，点击评分，为某个同学的某个作业评分，根据 sno、hno 获得 questionArr
export function getTeaRevQuestionArr(sno, hno) {
  return teaRequest({
    url: "/revQuestionArr",
    params: {
      sno,
      hno,
    },
  });
}

// 作业评分页面，提交评分
export function submitReview(sno, hno, cno, scoreArr) {
  return teaRequest({
    url: "/submitReview",
    method: "post",
    data: {
      sno,
      hno,
      cno,
      scoreArr,
    },
  });
}

// 作业评分页面，点击查看详情，查看某个同学的某个作业的评分，根据 sno、hno 获得 questionArr
export function getTeaRevQuestionArr2(sno, hno) {
  return teaRequest({
    url: "/revQuestionArr2",
    params: {
      sno,
      hno,
    },
  });
}

// 讨论详情
export function getTeaDisDetail(dno, tno) {
  return teaRequest({
    url: "/disDetail",
    params: {
      dno,
      tno,
    },
  });
}

// 创建讨论题
export function submitDis(form, tno, cname) {
  return teaRequest({
    url: "/submitDis",
    method: "post",
    data: {
      form,
      tno,
      cname,
    },
  });
}

// 发布讨论
export function submitTeaDis(dno, tno, content) {
  return teaRequest({
    url: "/newDis",
    method: "post",
    data: {
      dno,
      tno,
      content,
    },
  });
}

// 查看习题卷详情
export function getTeaQueDetail(bno) {
  return teaRequest({
    url: "/queDetail",
    params: {
      bno,
    },
  });
}

// 创建习题，提交习题信息
export function newQue(tno, bagname, infoOjb) {
  return teaRequest({
    url: "/newQue",
    method: "post",
    data: {
      tno,
      bagname,
      infoOjb,
    },
  });
}
// 查看某个作业的学习分析
export function getTeaAnaDetail(hno) {
  return teaRequest({
    url: "/anaDetail",
    params: {
      hno,
    },
  });
}
