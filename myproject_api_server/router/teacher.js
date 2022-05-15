const express = require("express");
const teaHandler = require("../router_handler/teacher.js");
const teaRouter = express.Router();

// 老师首页各个功能模块的请求
teaRouter.get("/homework", teaHandler.homework);
teaRouter.get("/news", teaHandler.news);
teaRouter.get("/review", teaHandler.review);
teaRouter.get("/discussion", teaHandler.discussion);
teaRouter.get("/questions", teaHandler.questions);
teaRouter.get("/resource", teaHandler.resource);
// 上传资源
// teaRouter.get("/uploadResource", teaHandler.uploadResource);
teaRouter.get("/analysis", teaHandler.analysis);

// 老师的二级页面的请求
// 查看某个作业详情
teaRouter.get("/TeaHomeworkDetail", teaHandler.TeaHomeworkDetail);
// 创建作业页面，获得所有班级
// 创建公告页面，获得所有班级
teaRouter.get("/allClass", teaHandler.allClass);
// 创建作业页面，根据 chosenQueArr 获得 题目详情
teaRouter.post("/chosenQueArr", teaHandler.chosenQueArr);
// 提交创建作业的信息，发布作业
teaRouter.post("/newHomeworkSubmit", teaHandler.newHomeworkSubmit);
// 发布公告
teaRouter.post("/newNewsSubmit", teaHandler.newNewsSubmit);
// 作业评分页面，点击评分，为某个同学的某个作业评分，根据 sno、hno 获得 questionArr
teaRouter.get("/revQuestionArr", teaHandler.revQuestionArr);
// 作业评分页面，提交评分
teaRouter.post("/submitReview", teaHandler.submitReview);
// 作业评分页面，点击查看详情，查看某个同学的某个作业的评分，根据 sno、hno 获得 questionArr
teaRouter.get("/revQuestionArr2", teaHandler.revQuestionArr2);
// 讨论详情
teaRouter.get("/disDetail", teaHandler.disDetail);
// 创建讨论题
teaRouter.post("/submitDis", teaHandler.submitDis);
// 发布讨论
teaRouter.post("/newDis", teaHandler.newDis);
// 查看习题卷详情
teaRouter.get("/queDetail", teaHandler.queDetail);
// 上传习题
teaRouter.post("/newQue", teaHandler.newQue);
// 查看某个作业的学习分析
teaRouter.get("/anaDetail", teaHandler.anaDetail);

module.exports = teaRouter;
