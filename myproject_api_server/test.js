// 导入工具方法
const utils = require("./utils.js");
const res = require("./res.js");

// 连接数据库
const mysql = require("mysql");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "biyeshejiproject",
});
