// 导入工具方法
const utils = require("../utils.js");

// 连接数据库
const mysql = require("mysql");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "biyeshejiproject",
});

// 管理员首页各个功能模块的请求处理函数
// 管理班级
// 没有写
exports.getAllClass = (req, res) => {
  res.send("getAllClass success");
};

// 讨论区
exports.getAllDis = (req, res) => {
  //查找discussion、class_dis，2个表根据dno连接
  // 将时间格式化
  let queryStr = "select discussion.dno,class_dis.cname as subject,time,content from discussion left join class_dis on discussion.dno=class_dis.dno";
  db.query(queryStr, (err, results) => {
    if (err) return res.cc(err);
    utils.sortByTime(results, "time");
    utils.resFormatTime(results, "time");
    res.send(results);
  });
};

// 管理员的二级页面的请求处理函数
// 某个讨论区详情
exports.getDisDetail = (req, res) => {
  // 根据dno，查找discussion，获得content
  // 根据dno，查找comment，获得comno,content、time、tno、sno（数组1）
  // 根据sno或tno，查找tname、sname、img（数组2）
  // 根据sno或tno，连接数组1、数组2，得到comArr
  // 将content、comArr组成对象，返回
  let dno = req.query.dno;
  db.query("select content from discussion where dno=?", dno, (err, results) => {
    if (err) return res.cc(err);
    // 获得content
    let content = results[0].content;
    var snoStr = "";
    var tnoStr = "";
    var arr1 = [];
    var arr21 = [];
    var arr22 = [];
    new Promise((resolve, reject) => {
      db.query("select comno,content,time,tno,sno from comment where dno=?", dno, (err, results) => {
        if (err) return res.cc(err);
        // 数组1
        arr1 = results;
        let stuArr = arr1.filter((item) => item.sno);
        let teaArr = arr1.filter((item) => item.tno);
        snoStr = utils.resToInArr(stuArr, "sno");
        tnoStr = utils.resToInArr(teaArr, "tno");
        resolve();
      });
    })
      .then(() => {
        return new Promise((resolve, reject) => {
          if (snoStr !== "") {
            db.query("select * from student where sno in " + snoStr, (err, results) => {
              if (err) return res.cc(err);
              arr21 = results;
              resolve();
            });
          } else {
            resolve();
          }
        });
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          if (tnoStr !== "") {
            db.query("select * from teacher where tno in " + tnoStr, (err, results) => {
              if (err) return res.cc(err);
              arr22 = results;
              resolve();
            });
          } else {
            resolve();
          }
        });
      })
      .then(() => {
        // 连接好的数组
        let arr3 = [];
        if (arr21 && arr21.length !== 0) {
          arr1.forEach((item1) => {
            let obj = arr21.find((item2) => item1.sno === item2.sno);
            if (obj) {
              arr3.push({
                comno: item1.comno,
                sname: obj.name,
                tname: "",
                content: item1.content,
                time: item1.time,
                img: obj.img,
              });
            }
          });
        }
        if (arr22 && arr22.length !== 0) {
          arr1.forEach((item1) => {
            let obj = arr22.find((item2) => item1.tno === item2.tno);
            if (obj) {
              arr3.push({
                comno: item1.comno,
                sname: "",
                tname: obj.name,
                content: item1.content,
                time: item1.time,
                img: obj.img,
              });
            }
          });
        }
        utils.sortByTime(arr3, "time");
        // 格式化arr3的时间
        utils.resFormatTime(arr3, "time");
        // 组合成对象，返回
        var resObj = {
          content,
          comArr: arr3,
        };
        res.send(resObj);
      });
  });
};

// 删除评论
exports.deleteCom = (req, res) => {
  let comno = req.query.comno;
  db.query("delete from comment where comno=?", comno, (err, results) => {
    if (err) return res.cc(err);
    res.send({ status: 200 });
  });
};
