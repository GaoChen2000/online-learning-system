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

// 学生首页各个功能模块的请求处理函数
// 消息
exports.news = (req, res) => {
  let sno = req.query.sno;
  db.query("select cno from stu_class where sno=?", sno, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    let cnoStr = utils.resToInArr(results, "cno");
    db.query("select nno,content,time,typeName from news where cno in " + cnoStr, (err, results) => {
      if (err) {
        return res.cc(err);
      }
      utils.sortByTime(results, "time");
      let arr = [];
      results.forEach((item) => {
        arr.push({
          typeName: item.typeName,
          time: utils.formatTime(item.time),
          content: item.content,
          nno: item.nno,
        });
      });
      return res.send(arr);
    });
  });
};

// 作业
exports.homework = (req, res) => {
  let sno = req.query.sno;
  db.query("select hno,done from stu_homework where sno=?", sno, (err, results) => {
    if (err) return res.cc(err);
    // 数组1
    let hno_done_arr = results;
    let hnoStr = utils.resToInArr(results, "hno");
    db.query("select hno, cname as subjectTeacher, starttime as time, detail, cno, endtime from homework where hno in " + hnoStr, (err, results) => {
      if (err) return res.cc(err);
      utils.sortByTime(results, "time");
      // 数组2
      utils.resFormatTime(results, "time");
      // 按照 hno 相同，连接数组1、数组2，内容放到 arr 中
      results.forEach((item1) => {
        hno_done_arr.forEach((item2) => {
          if (item1.hno === item2.hno) {
            item1.done = item2.done === 0 ? false : true;
          }
        });
      });
      // 最终返回给客户端的结果
      res.send(results);
    });
  });
};

// 讨论
exports.discussion = (req, res) => {
  // 根据sno，查找stu_class找到cno，根据cno，查找class_dis表，找到dno和cname，dno转换为in格式，以此查找discussion
  // 先连接数组，最后才按时间先后排序，然后格式化时间
  let sno = req.query.sno;
  db.query("select cno from stu_class where sno=?", sno, (err, results) => {
    if (err) return res.cc(err);
    let cnoStr = utils.resToInArr(results, "cno");
    db.query("select cno,cname as subjectTeacher,dno from class_dis where cno in " + cnoStr, (err, results) => {
      if (err) return res.cc(err);
      // 数组1
      let arr1 = results;
      let dnoStr = utils.resToInArr(results, "dno");
      db.query("select dno,content,time from discussion where dno in " + dnoStr, (err, results) => {
        if (err) return res.cc(err);
        // 数组2
        let arr2 = results;
        // 连接数组1、数组2
        let arr3 = [];
        arr1.forEach((item1) => {
          arr2.forEach((item2) => {
            if (item1.dno === item2.dno) {
              let obj = {
                dno: item1.dno,
                subjectTeacher: item1.subjectTeacher,
                time: item2.time,
                content: item2.content,
              };
              arr3.push(obj);
            }
          });
        });
        // 对连接好的数组arr3，按时间排序，格式化时间
        utils.sortByTime(arr3, "time");
        utils.resFormatTime(arr3, "time");
        res.send(arr3);
      });
    });
  });
};

// 错题集
exports.mistake = (req, res) => {
  // 根据sno，查找stu_que，取出cno、cname
  let sno = req.query.sno;
  db.query("select distinct cno,cname from stu_que where sno=?", sno, (err, results) => {
    if (err) return res.cc(err);
    res.send(results);
  });
};

// 班级资源
exports.resource = (req, res) => {
  // 根据sno，查找stu_class，找到cno，变成in格式，查找class，返回cno、name
  let sno = req.query.sno;
  db.query("select cno from stu_class where sno=?", sno, (err, results) => {
    if (err) return res.cc(err);
    let cnoStr = utils.resToInArr(results, "cno");
    db.query("select cno,name from class where cno in " + cnoStr, (err, results) => {
      if (err) return res.cc(err);
      res.send(results);
    });
  });
};

// 学生的二级页面的请求处理函数
// 作业习题
exports.homeworkQuestion = (req, res) => {
  // （1）根据hno，查找home_que，找到qno、queNo、type，将qno转换成in格式，
  // 根据type，查找question表，返回所有字段，进行相应的转换
  // 并按queNo排序
  // （2）根据sno、qno、type，查找stu_que，找到qno、type、stuAns
  // 根据qno，连接上面的查找结果
  let hno = req.query.hno;
  let sno = req.query.sno;
  db.query("select qno,queNo,type from home_que where hno=?", hno, (err, results) => {
    if (err) res.cc(err);
    // 数组1
    let arr1 = results;
    // 对arr1按queNo排序
    arr1.sort((x, y) => x.queNo - y.queNo);
    // 数组2
    let arr2 = [];
    new Promise((resolve, reject) => {
      utils.makeQueArr(results, db, res, arr2, resolve);
    })
      .then(() => {
        // 存放排序好的arr2
        var arr3 = [];
        // 根据arr1，对arr2按照queNo排序
        arr1.forEach((item1) => {
          arr3.push(arr2.find((item2) => item2.type === item1.type && item2.qno === item1.qno));
        });
        return new Promise((resolve, reject) => {
          db.query("select qno,type,stuAns from stu_que where sno=?", sno, (err, results) => {
            if (err) return res.cc(err);
            arr3.forEach((item) => {
              let obj = results.find((item4) => item4.qno === item.qno && item4.type === item.type);
              item.stuAns = obj && obj.stuAns ? obj.stuAns : "";
            });
            resolve(arr3);
          });
        });
      })
      .then((arr3) => {
        res.send(arr3);
      });
  });
};

// 提交作业答案，提交之后，对选择题、填空题自动评分，判断是否为错题，修改stu_que的mistake字段
exports.submitStuAns = (req, res) => {
  let obj = req.body.obj;
  let hno = obj.hno;
  let sno = obj.sno;
  let ansArr = obj.ansArr;
  let sname = obj.sname;
  let cno = obj.cno;
  let cname = obj.cname;
  let valueStr = "";
  ansArr.forEach((item) => {
    if (item.type === "1") {
      let ans = item.stuAns;
      if (ans === 0) {
        item.stuAns = "A";
      } else if (ans === 1) {
        item.stuAns = "B";
      } else if (ans === 2) {
        item.stuAns = "C";
      } else if (ans === 3) {
        item.stuAns = "D";
      } else if (ans === 4) {
        item.stuAns = "E";
      } else if (ans === 5) {
        item.stuAns = "F";
      }
    }
    valueStr =
      valueStr +
      "(" +
      sno +
      "," +
      "'" +
      sname +
      "'" +
      "," +
      hno +
      "," +
      item.qno +
      "," +
      "'" +
      item.stuAns +
      "'" +
      "," +
      cno +
      "," +
      "'" +
      cname +
      "'" +
      "," +
      "'" +
      item.type +
      "'" +
      "," +
      item.mistake +
      "," +
      0 +
      ")" +
      ",";
  });
  valueStr = valueStr.substring(0, valueStr.length - 1);
  new Promise((resolve, reject) => {
    db.query("insert into stu_que(sno,name,hno,qno,stuAns,cno,cname,type,mistake,score) values" + valueStr, (err, results) => {
      if (err) reject(err);
      else resolve();
    });
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        db.query("update stu_homework set done=? where sno=? and hno=?", [1, sno, hno], (err, results) => {
          if (err) reject(err);
          else resolve();
        });
      });
    })
    .then(() => {
      res.send({ status: 200 });
    })
    .catch((err) => {
      res.cc(err);
    });
};

// 讨论详情
exports.disDetail = (req, res) => {
  // 根据dno，查找discussion，获得content
  // 根据sno、dno，查找comment，获得content、time，组成myCom
  // 根据dno，查找comment，获得content、time、tno、sno（数组1）
  // 根据sno或tno，查找tname、sname、img（数组2）
  // 根据sno或tno，连接数组1、数组2，得到comArr
  // 将content、myCom、comArr组成对象，返回
  let dno = req.query.dno;
  let sno = req.query.sno;
  db.query("select content from discussion where dno=?", dno, (err, results) => {
    if (err) return res.cc(err);
    // 获得content
    let content = results[0].content;
    db.query("select content,time from comment where sno=? and dno=?", [sno, dno], (err, results) => {
      if (err) return res.cc(err);
      // 获得myCom
      var myCom = results;
      utils.sortByTime(myCom, "time");
      utils.resFormatTime(myCom, "time");
      var snoStr = "";
      var tnoStr = "";
      var arr1 = [];
      var arr21 = [];
      var arr22 = [];
      new Promise((resolve, reject) => {
        db.query("select content,time,tno,sno from comment where dno=?", dno, (err, results) => {
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
            myCom,
            comArr: arr3,
          };
          res.send(resObj);
        });
    });
  });
};

// 发布讨论
exports.newDis = (req, res) => {
  let sno = req.body.sno;
  let dno = req.body.dno;
  let content = req.body.content;
  let time = new Date();
  db.query("insert into comment(content,time,dno,sno,tno) values(?,?,?,?,?)", [content, time, dno, sno, -1], (err, results) => {
    if (err) return res.cc(err);
    return res.send({ status: 200 });
  });
};

// 某个科目的错题
exports.misDetail = (req, res) => {
  // 根据sno、cno、mistake，查找stu_que，获得qno、type、stuAns（数组1）
  // 根据qno，查找question表，获得全部字段（数组2）
  // 根据qno、type，连接数组1、数组2
  let sno = req.query.sno;
  let cno = req.query.cno;
  db.query("select qno,type,stuAns from stu_que where sno=? and cno=? and mistake=?", [sno, cno, 1], (err, results) => {
    if (err) return res.cc(err);
    // 数组1
    var arr1 = results;
    // 数组2
    let arr2 = [];
    new Promise((resolve, reject) => {
      utils.makeQueArr(results, db, res, arr2, resolve);
    }).then(() => {
      var arr3 = [];
      arr1.forEach((item1) => {
        let obj = arr2.find((item2) => item1.qno === item2.qno && item1.type === item2.type);
        arr3.push({ ...item1, ...obj });
      });
      res.send(arr3);
    });
  });
};

// 查看某个班级的资源
exports.resDetail = (req, res) => {
  // 根据cno，查找resource_class，找到rno
  // 根据rno，查找resource，返回rno、name、url
  let cno = req.query.cno;
  db.query("select rno from resource_class where cno=?", cno, (err, results) => {
    if (err) res.cc(err);
    let rnoStr = utils.resToInArr(results, "rno");
    db.query("select rno,name,url from resource where rno in " + rnoStr, (err, results) => {
      if (err) res.cc(err);
      res.send(results);
    });
  });
};
