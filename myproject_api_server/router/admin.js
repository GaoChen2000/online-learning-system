const express = require("express");
const admHandler = require("../router_handler/admin.js");
const admRouter = express.Router();

// 管理员首页各个功能模块的请求
admRouter.get("/getAllClass", admHandler.getAllClass);
admRouter.get("/getAllDis", admHandler.getAllDis);

// 管理员二级页面的请求
// 某个讨论区详情
admRouter.get("/getDisDetail", admHandler.getDisDetail);
// 删除评论
admRouter.get("/deleteCom", admHandler.deleteCom);

module.exports = admRouter;
