const express = require("express");
const stuHandler = require("../router_handler/student.js");
const stuRouter = express.Router();

// 学生首页各个功能模块的请求
stuRouter.get("/news", stuHandler.news);
stuRouter.get("/homework", stuHandler.homework);
stuRouter.get("/discussion", stuHandler.discussion);
stuRouter.get("/mistake", stuHandler.mistake);
stuRouter.get("/resource", stuHandler.resource);

// 学生二级页面的请求
// 作业习题
stuRouter.get("/homeworkQuestion", stuHandler.homeworkQuestion);
// 提交作业答案
stuRouter.post("/submitStuAns", stuHandler.submitStuAns);
// 讨论详情
stuRouter.get("/disDetail", stuHandler.disDetail);
// 发布讨论
stuRouter.post("/newDis", stuHandler.newDis);
// 某个科目的错题
stuRouter.get("/misDetail", stuHandler.misDetail);
// 查看某个班级的资源
stuRouter.get("/resDetail", stuHandler.resDetail);

module.exports = stuRouter;
