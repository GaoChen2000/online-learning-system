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

// 登录
exports.login = (req, res) => {
  let name = req.body.name;
  let password = req.body.password;
  let role = req.body.role;
  if (role === 1) {
    db.query("select sno,name,img,password from student where sno=?", name, (err, results) => {
      if (err) return res.cc(err);
      else if (results.length === 0) {
        return res.send({ status: 400, message: "登录失败，用户名不正确" });
      } else if (!bcrypt.compareSync(password, results[0].password)) {
        return res.send({ status: 400, message: "登录失败，密码不正确" });
      } else {
        const tokenStr = jwt.sign({ username: results[0].name, sno: results[0].sno }, secretKey, { expiresIn: "30s" });
        res.send({
          status: 200,
          token: tokenStr,
          name: results[0].name,
          no: results[0].sno,
          img: results[0].img,
        });
      }
    });
  } else if (role === 2) {
    db.query("select tno,name,img,password from teacher where tno=?", name, (err, results) => {
      if (err) return res.cc(err);
      else if (results.length === 0) {
        return res.send({ status: 400, message: "登录失败，用户名不正确" });
      } else if (!bcrypt.compareSync(password, results[0].password)) {
        return res.send({ status: 400, message: "登录失败，密码不正确" });
      } else {
        const tokenStr = jwt.sign({ username: results[0].name, tno: results[0].tno }, secretKey, { expiresIn: "30s" });
        res.send({
          status: 200,
          token: tokenStr,
          name: results[0].name,
          no: results[0].tno,
          img: results[0].img,
        });
      }
    });
  } else if (role === 3) {
    db.query("select ano,name,img,password from admin where ano=?", name, (err, results) => {
      if (err) return res.cc(err);
      else if (results.length === 0) {
        return res.send({ status: 400, message: "登录失败，用户名不正确" });
      } else if (!bcrypt.compareSync(password, results[0].password)) {
        return res.send({ status: 400, message: "登录失败，密码不正确" });
      } else {
        const tokenStr = jwt.sign({ username: results[0].name, ano: results[0].ano }, secretKey, { expiresIn: "30s" });
        res.send({
          status: 200,
          token: tokenStr,
          name: results[0].name,
          no: results[0].ano,
          img: results[0].img,
        });
      }
    });
  }
};

// 注册
exports.register = (req, res) => {
  let form = req.body.form;
  let password = bcrypt.hashSync(form.password, 10);
  if (form.role === 1) {
    db.query("insert into student(name,password) values(?,?)", [form.name, password], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows === 1) return res.send({ status: 200, message: "账号创建成功", no: results.insertId });
    });
  } else if (form.role === 2) {
    db.query("insert into teacher(name,password) values(?,?)", [form.name, password], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows === 1) return res.send({ status: 200, message: "账号创建成功", no: results.insertId });
    });
  } else if (form.role === 3) {
    db.query("insert into admin(name,password) values(?,?)", [form.name, password], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows === 1) return res.send({ status: 200, message: "账号创建成功", no: results.insertId });
    });
  }
};
