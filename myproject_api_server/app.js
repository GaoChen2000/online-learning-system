const express = require("express");
const cors = require("cors");
const stuRouter = require("./router/student.js");
const teaRouter = require("./router/teacher.js");
const admRouter = require("./router/admin.js");
const loginRegisterHandler = require("./router_handler/loginRegister.js");
const selfHandler = require("./router_handler/self.js");

const app = express();

// 中间件
// 托管静态资源
// 前端页面
app.use(express.static("./dist"));
// 服务器上的图片资源
app.use(express.static("./public"));

// 配置解析post请求体的中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 配置跨域
app.use(cors());

// 向客户端返回错误的中间件
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({ status, message: err instanceof Error ? err.message : err });
  };
  next();
});

// 路由
app.use("/student", stuRouter);
app.use("/teacher", teaRouter);
app.use("/admin", admRouter);
// 登录的路由
app.post("/login", loginRegisterHandler.login);
// 注册的路由
app.post("/register", loginRegisterHandler.register);
// 个人中心的路由
app.get("/selfInfo", selfHandler.selfInfo);
app.post("/setSelfInfo", selfHandler.setSelfInfo);

app.listen(8081, () => {
  console.log("express server running at http://127.0.0.1:8081");
});
