// 导入JWT相关的包
const jwt = require("jsonwebtoken");
// 导入加密密码、判断加密字符串是否相同的包
const bcrypt = require("bcryptjs");
// 定义用于生成jwt时，加密用户信息的密钥
const secretKey = "biyesheji ^_^";

// 连接数据库
const mysql = require("mysql");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "biyeshejiproject",
});

// 获得用户基本信息
exports.selfInfo = (req, res) => {
  let role = req.query.role;
  let no = req.query.no;
  if (role === "1") {
    db.query("select name,img,password from student where sno=?", no, (err, results) => {
      if (err) return res.cc(err);
      res.send(results);
    });
  } else if (role === "2") {
    db.query("select name,img,password from teacher where tno=?", no, (err, results) => {
      if (err) return res.cc(err);
      res.send(results);
    });
  } else if (role === "3") {
    db.query("select name,img,password from admin where ano=?", no, (err, results) => {
      if (err) return res.cc(err);
      res.send(results);
    });
  }
};

// 修改用户基本信息
exports.setSelfInfo = (req, res) => {
  let no = req.body.no;
  let name = req.body.name;
  let type = req.body.type;
  let updatePassword = req.body.updatePassword;
  if (updatePassword) {
    let password = bcrypt.hashSync(req.body.password, 10);
    if (type === "1") {
      db.query("update student set name=?,password=? where sno=?", [name, password, no], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows === 1) res.send({ status: 200 });
      });
    } else if (type === "2") {
      db.query("update teacher set name=?,password=? where tno=?", [name, password, no], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows === 1) res.send({ status: 200 });
      });
    } else if (type === "3") {
      db.query("update admin set name=?,password=? where ano=?", [name, password, no], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows === 1) res.send({ status: 200 });
      });
    }
  } else {
    if (type === "1") {
      db.query("update student set name=? where sno=?", [name, no], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows === 1) res.send({ status: 200 });
      });
    } else if (type === "2") {
      db.query("update teacher set name=? where tno=?", [name, no], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows === 1) res.send({ status: 200 });
      });
    } else if (type === "3") {
      db.query("update admin set name=? where ano=?", [name, no], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows === 1) res.send({ status: 200 });
      });
    }
  }
};
