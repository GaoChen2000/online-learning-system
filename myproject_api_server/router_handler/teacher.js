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

// 老师首页的各个功能模块的请求处理函数
// 作业
exports.homework = (req, res) => {
  // 根据tno，查找homework，找到hno,cname,time,detail
  // 按time先后排序，再将time转换成前端需要的格式
  let tno = req.query.tno;
  db.query("select hno,cname as subject,starttime as time,detail,endtime from homework where tno=?", tno, (err, results) => {
    if (err) return res.cc(err);
    utils.sortByTime(results, "time");
    utils.resFormatTime(results, "time");
    res.send(results);
  });
};

// 消息
exports.news = (req, res) => {
  // 根据tno，查找news，找到cname,time,content
  // 按time先后顺序排序，再转换time格式
  let tno = req.query.tno;
  db.query("select typeName as subject,time,content from news where tno=?", tno, (err, results) => {
    if (err) return res.cc(err);
    utils.sortByTime(results, "time");
    utils.resFormatTime(results, "time");
    res.send(results);
  });
};

// 评分
exports.review = (req, res) => {
  // 根据tno，查找homework，找到hno,cname,time,content（数组1)
  // 按time先后顺序排序
  // 根据hno，查找stu_homework，找到sno,name,hasReview，组成homeworkArr（数组2）
  // 根据hno，将homeworkArr，作为属性，添加到数组1中
  let tno = req.query.tno;
  db.query("select hno,detail,cno,cname as subject,starttime from homework where tno=?", tno, (err, results) => {
    if (err) return res.cc(err);
    utils.sortByTime(results, "starttime");
    // 数组1
    let arr1 = results;
    let hnoStr = utils.resToInArr(results, "hno");
    let queryStr =
      "select hno,stu_homework.sno,name,hasReview from stu_homework inner join student on stu_homework.sno=student.sno where hno in " + hnoStr;
    db.query(queryStr, (err, results) => {
      if (err) return res.cc(err);
      results.forEach((item) => {
        item.hasReview = item.hasReview === 1 ? true : false;
      });
      // 数组2
      let arr2 = results;
      arr1.forEach((item1) => {
        let hno = item1.hno;
        let arr = [];
        arr2.forEach((item2) => {
          if (item2.hno === hno) {
            arr.push(item2);
          }
        });
        item1.homeworkArr = arr;
      });
      res.send(arr1);
    });
  });
};

// 讨论区
exports.discussion = (req, res) => {
  // 根据tno，查找discussion、class_dis，2个表根据dno连接
  // 将时间格式化
  let tno = req.query.tno;
  let queryStr =
    "select discussion.dno,class_dis.cname as subject,time,content from discussion left join class_dis on discussion.dno=class_dis.dno where tno=?";
  db.query(queryStr, tno, (err, results) => {
    if (err) return res.cc(err);
    utils.sortByTime(results, "time");
    utils.resFormatTime(results, "time");
    res.send(results);
  });
};

// 习题库
exports.questions = (req, res) => {
  // 根据tno，查找question_bag，获得bno,name
  let tno = req.query.tno;
  db.query("select bno,name from question_bag where tno=?", tno, (err, results) => {
    if (err) return res.cc(err);
    res.send(results);
  });
};

// 资源库
exports.resource = (req, res) => {
  // 根据tno，查找resource
  let tno = req.query.tno;
  db.query("select rno,name,url from resource where tno=?", tno, (err, results) => {
    if (err) return res.cc(err);
    res.send(results);
  });
};

// 上传资源
// 没写完
// exports.uploadResource = (req, res) => {
//   // 获得fileList
// };

// 学习分析
exports.analysis = (req, res) => {
  // 根据tno，查找homework，按时间排序，格式化时间
  let tno = req.query.tno;
  db.query("select hno,cname as subject,starttime as time,detail from homework where tno=?", tno, (err, results) => {
    if (err) return res.cc(err);
    utils.sortByTime(results, "time");
    utils.resFormatTime(results, "time");
    res.send(results);
  });
};

// 老师的二级页面的请求处理函数
// 查看某个作业详情
exports.TeaHomeworkDetail = (req, res) => {
  // 根据hno，查找home_que表，获得qno、type
  // 根据qno，查找question表，获得所有字段，返回
  let hno = req.query.hno;
  db.query("select qno,type from home_que where hno=?", hno, (err, results) => {
    if (err) return res.cc(err);
    // 数组1
    let arr1 = results;
    // 数组2
    let arr2 = [];
    new Promise((resolve, reject) => {
      utils.makeQueArr(arr1, db, res, arr2, resolve);
    }).then(() => {
      res.send(arr2);
    });
  });
};

// 创建作业页面，获得所有班级
// 创建公告页面，获得所有班级
exports.allClass = (req, res) => {
  // 根据tno，查找class，获得cno、name
  let tno = req.query.tno;
  db.query("select cno as value,name as label from class where tno=?", tno, (err, results) => {
    if (err) return res.cc(err);
    results.forEach((item) => {
      item.value = item.value.toString();
    });
    res.send(results);
  });
};

// 创建作业页面，根据 chosenQueArr 获得 题目详情
exports.chosenQueArr = (req, res) => {
  // 根据chosenQueArr中的qno、type，获得题目信息
  let chosenQueArr = req.body.chosenQueArr;
  let arr = [];
  new Promise((resolve, reject) => {
    utils.makeQueArr(chosenQueArr, db, res, arr, resolve);
  }).then(() => {
    res.send(arr);
  });
};

// 提交创建作业的信息，发布作业
exports.newHomeworkSubmit = (req, res) => {
  // 创建当前时间
  // 将数据插入homework，获得hno
  // 根据hno、form.questions，将数据插入home_que
  // 将数据插入到class_home
  // 根据cno，查找stu_class，获得sno，将数据插入stu_homework
  let form = req.body.form;
  let cname = req.body.cname;
  let tno = req.body.tno;

  let starttime = new Date();
  // 插入homework
  db.query(
    "insert into homework(detail,cno,cname,starttime,endtime,tno) values(?,?,?,?,?,?)",
    [form.detail, form.chosenClass, cname, starttime, form.stopTime, tno],
    (err, results) => {
      if (err) return res.cc(err);
      // 获得hno，插入home_que
      var hno = results.insertId;
      form.questions.forEach((item) => {
        db.query("insert into home_que(hno,type,qno,queNo) values(?,?,?,?)", [hno, item.type, item.qno, item.queNo], (err, results) => {
          if (err) return res.cc(err);
        });
      });
      // 插入到class_home
      db.query("insert into class_home(cno,hno) values(?,?)", [form.chosenClass, hno], (err, results) => {
        if (err) return res.cc(err);
        // 根据cno，查找stu_class，获得sno
        db.query("select sno from stu_class where cno=?", form.chosenClass, (err, results) => {
          if (err) return res.cc(err);
          // 插入stu_homework
          results.forEach((item) => {
            db.query("insert into stu_homework(sno,hno) values(?,?)", [item.sno, hno], (err, results) => {
              if (err) return res.cc(err);
              res.send({ status: 200 });
            });
          });
        });
      });
    }
  );
};

// 发布公告
exports.newNewsSubmit = (req, res) => {
  // 将数据插入news
  // 将数据class_news
  let form = req.body.form;
  let tno = req.body.tno;
  let cname = req.body.cname;

  let time = new Date();
  db.query(
    "insert into news(content,time,cno,typeName,tno) values(?,?,?,?,?)",
    [form.content, time, form.chosenClass, cname, tno],
    (err, results) => {
      if (err) return res.cc(err);
      let nno = results.insertId;
      db.query("insert into class_news(cno,nno) values(?,?)", [form.chosenClass, nno], (err, results) => {
        if (err) return res.cc(err);
        return res.send({ status: 200 });
      });
    }
  );
};

// 作业评分页面，点击评分，为某个同学的某个作业评分，根据 sno、hno 获得 questionArr
exports.revQuestionArr = (req, res) => {
  // 根据sno、hno，查找stu_que，获得qno、type、stuAns，并筛选出type为3、4的题目（数组1）
  // 根据数组1，返回题目信息（数组2）
  // 根据qno、type连接数组1、数组2
  let sno = req.query.sno;
  let hno = req.query.hno;
  db.query("select qno,type,stuAns from stu_que where sno=? and hno=?", [sno, hno], (err, results) => {
    if (err) return res.cc(err);
    let arr1 = results.filter((item) => item.type === "3" || item.type === "4");
    let arr2 = [];
    new Promise((resolve, reject) => {
      utils.makeQueArr(arr1, db, res, arr2, resolve);
    }).then(() => {
      arr1.forEach((item1) => {
        let obj = arr2.find((item2) => item1.qno === item2.qno && item1.type === item2.type);
        if (obj) {
          obj.stuAns = item1.stuAns;
        }
      });
      res.send(arr2);
    });
  });
};

// 作业评分页面，提交评分
exports.submitReview = (req, res) => {
  let sno = req.body.sno;
  let hno = req.body.hno;
  let cno = req.body.cno;
  let scoreArr = req.body.scoreArr;
  let promiseArr = [];
  scoreArr.forEach((item) => {
    let p = new Promise((resolve, reject) => {
      db.query(
        "update stu_que set score=?,mistake=? where qno=? and type=? and hno=? and cno=? and sno=?",
        [item.score, item.mistake, item.qno, item.type, hno, cno, sno],
        (err, results) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
    promiseArr.push(p);
  });
  Promise.all(promiseArr)
    .then(() => {
      return new Promise((resolve, reject) => {
        db.query("update stu_homework set hasReview=? where sno=? and hno=?", [1, sno, hno], (err, results) => {
          if (err) reject();
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

// 作业评分页面，点击查看详情，查看某个同学的某个作业的评分，根据 sno、hno 获得 questionArr
exports.revQuestionArr2 = (req, res) => {
  // 根据sno、hno，查找stu_que，获得qno、type、stuAns，并筛选出type为3、4的题目（数组1）
  // 根据数组1，返回题目信息（数组2）
  // 根据qno、type连接数组1、数组2
  let sno = req.query.sno;
  let hno = req.query.hno;
  db.query("select qno,type,stuAns,score as teaScore from stu_que where sno=? and hno=?", [sno, hno], (err, results) => {
    if (err) return res.cc(err);
    let arr1 = results.filter((item) => item.type === "3" || item.type === "4");
    let arr2 = [];
    new Promise((resolve, reject) => {
      utils.makeQueArr(arr1, db, res, arr2, resolve);
    }).then(() => {
      arr1.forEach((item1) => {
        let obj = arr2.find((item2) => item1.qno === item2.qno && item1.type === item2.type);
        if (obj) {
          obj.stuAns = item1.stuAns;
          obj.teaScore = item1.teaScore;
        }
      });
      res.send(arr2);
    });
  });
};

// 讨论详情
exports.disDetail = (req, res) => {
  // 根据dno，查找discussion，获得content
  // 根据tno、dno，查找comment，获得content、time，组成myCom
  // 根据dno，查找comment，获得content、time、tno、sno（数组1）
  // 根据sno或tno，查找tname、sname、img（数组2）
  // 根据sno或tno，连接数组1、数组2，得到comArr
  // 将content、myCom、comArr组成对象，返回
  let dno = req.query.dno;
  let tno = req.query.tno;
  db.query("select content from discussion where dno=?", dno, (err, results) => {
    if (err) return res.cc(err);
    // 获得content
    let content = results[0].content;
    db.query("select content,time from comment where tno=? and dno=?", [tno, dno], (err, results) => {
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

// 创建讨论题
exports.submitDis = (req, res) => {
  // 将数据插入discussion
  // 将数据插入class_dis
  let form = req.body.form;
  let tno = req.body.tno;
  let cname = req.body.cname;
  let time = new Date();
  db.query("insert into discussion(content,time,tno) values(?,?,?)", [form.content, time, tno], (err, results) => {
    if (err) return res.cc(err);
    let dno = results.insertId;
    db.query("insert into class_dis(cno,cname,dno) values(?,?,?)", [form.chosenClass, cname, dno], (err, results) => {
      if (err) return res.cc(err);
      return res.send({ status: 200 });
    });
  });
};

// 发布讨论
exports.newDis = (req, res) => {
  let dno = req.body.dno;
  let tno = req.body.tno;
  let content = req.body.content;
  let time = new Date();
  db.query("insert into comment(content,time,dno,tno,sno) values(?,?,?,?,?)", [content, time, dno, tno, -1], (err, results) => {
    if (err) return res.cc(err);
    return res.send({ status: 200 });
  });
};

// 查看习题卷详情
exports.queDetail = (req, res) => {
  // 根据bno，查找que_bag_que，获得qno、type
  // 根据qno、type，获得题目信息
  let bno = req.query.bno;
  db.query("select qno,type from que_bag_que where bno=?", bno, (err, results) => {
    if (err) return res.cc(err);
    let arr = [];
    new Promise((resolve, reject) => {
      utils.makeQueArr(results, db, res, arr, resolve);
    }).then(() => {
      res.send(arr);
    });
  });
};

// 创建习题
exports.newQue = (req, res) => {
  let tno = req.body.tno;
  let bagname = req.body.bagname;
  let infoOjb = req.body.infoOjb;
  // 插入表question_bag
  db.query("insert into question_bag(name,tno) values(?,?)", [bagname, tno], (err, results) => {
    if (err) return res.cc(err);
    let bno = results.insertId;
    var xzQnoArr = [];
    var tkQnoArr = [];
    var jdQnoArr = [];
    var jsQnoArr = [];
    // 插入表question_xz
    new Promise((resolve, reject) => {
      if (JSON.stringify(infoOjb.xz) !== "{}") {
        let xzStr = "";
        for (let key in infoOjb.xz) {
          let obj = infoOjb.xz[key];
          xzStr =
            xzStr +
            `('${obj.content}','${obj.radio[0]}','${obj.radio[1]}','${obj.radio[2]}','${obj.radio[3]}','${obj.radio[4] ? obj.radio[4] : ""}','${
              obj.radio[5] ? obj.radio[5] : ""
            }','${obj.answer}','${obj.analysis}'),`;
        }
        xzStr = xzStr.substring(0, xzStr.length - 1);
        db.query("insert into question_xz(content,A,B,C,D,E,F,answer,analysis) values" + xzStr, (err, results) => {
          if (err) return res.cc(err);
          var id = results.insertId;
          for (let i = 0; i < results.affectedRows; i++) {
            xzQnoArr.push(id + i);
          }
          resolve();
        });
      } else {
        resolve();
      }
    })
      // 插入表question_tk
      .then(() => {
        return new Promise((resolve, reject) => {
          if (JSON.stringify(infoOjb.tk) !== "{}") {
            let tkStr = "";
            for (let key in infoOjb.tk) {
              let obj = infoOjb.tk[key];
              tkStr = tkStr + `('${obj.content}','${obj.answer}','${obj.analysis}'),`;
            }
            tkStr = tkStr.substring(0, tkStr.length - 1);
            db.query("insert into question_tk(content,answer,analysis) values" + tkStr, (err, results) => {
              if (err) return res.cc(err);
              var id = results.insertId;
              for (let i = 0; i < results.affectedRows; i++) {
                tkQnoArr.push(id + i);
              }
              resolve();
            });
          } else {
            resolve();
          }
        });
      })
      // 插入表question_jd
      .then(() => {
        return new Promise((resolve, reject) => {
          if (JSON.stringify(infoOjb.jd) !== "{}") {
            let jdStr = "";
            for (let key in infoOjb.jd) {
              let obj = infoOjb.jd[key];
              jdStr = jdStr + `('${obj.content}','${obj.answer}','${obj.analysis}',${obj.score}),`;
            }
            jdStr = jdStr.substring(0, jdStr.length - 1);
            db.query("insert into question_jd(content,answer,analysis,score) values" + jdStr, (err, results) => {
              if (err) return res.cc(err);
              var id = results.insertId;
              for (let i = 0; i < results.affectedRows; i++) {
                jdQnoArr.push(id + i);
              }
              resolve();
            });
          } else {
            resolve();
          }
        });
      })
      // 插入表question_js
      .then(() => {
        return new Promise((resolve, reject) => {
          if (JSON.stringify(infoOjb.js) !== "{}") {
            let jsStr = "";
            for (let key in infoOjb.js) {
              let obj = infoOjb.js[key];
              jsStr = jsStr + `('${obj.content}','${obj.answer}','${obj.analysis}',${obj.score}),`;
            }
            jsStr = jsStr.substring(0, jsStr.length - 1);
            db.query("insert into question_js(content,answer,analysis,score) values" + jsStr, (err, results) => {
              if (err) return res.cc(err);
              var id = results.insertId;
              for (let i = 0; i < results.affectedRows; i++) {
                jsQnoArr.push(id + i);
              }
              resolve();
            });
          } else {
            resolve();
          }
        });
      })
      // 插入表que_bag_que
      .then(() => {
        let qnoTypeStr = "";
        xzQnoArr.forEach((item) => {
          qnoTypeStr = qnoTypeStr + `(${bno},${item},'1'),`;
        });
        tkQnoArr.forEach((item) => {
          qnoTypeStr = qnoTypeStr + `(${bno},${item},'2'),`;
        });
        jdQnoArr.forEach((item) => {
          qnoTypeStr = qnoTypeStr + `(${bno},${item},'3'),`;
        });
        jsQnoArr.forEach((item) => {
          qnoTypeStr = qnoTypeStr + `(${bno},${item},'4'),`;
        });
        qnoTypeStr = qnoTypeStr.substring(0, qnoTypeStr.length - 1);
        db.query("insert into que_bag_que(bno,qno,type) values" + qnoTypeStr, (err, results) => {
          if (err) return res.cc(err);
          return res.send({ status: 200 });
        });
      });
  });
};

// 查看某个作业的学习分析
exports.anaDetail = (req, res) => {
  // 根据hno，查找home_que，获得qno、type、queNo，筛选出type为1、2的题目（数组1）
  // 根据hno，查找homework，获得cno，根据cno，查找stu_class，获得sno，统计sno的个数，将sno转换成in格式
  // 根据sno、hno，查找stu_que，获得qno、type、mistake，筛选出type为1、2的题目（数组2）
  // 按照qno、type对数组2进行分组，统计mistake个数
  // 将每个mistake的个数除以sno的个数，获得每个qno、type的rate（数组3）
  // 根据qno、type，连接数组1、数组3
  let hno = req.query.hno;
  db.query("select qno,type,queNo from home_que where hno=?", hno, (err, results) => {
    if (err) return res.cc(err);
    // 数组1
    let arr1 = results.filter((item) => item.type === "1" || item.type === "2");
    db.query("select cno from homework where hno=?", hno, (err, results) => {
      if (err) return res.cc(err);
      let cno = results[0].cno;
      db.query("select sno from stu_class where cno=?", cno, (err, results) => {
        if (err) return res.cc(err);
        var snoCount = results.length;
        let snoStr = utils.resToInArr(results, "sno");
        db.query("select sno,qno,type,mistake from stu_que where hno=? and sno in " + snoStr, hno, (err, results) => {
          if (err) return res.cc(err);
          // 数组2
          let arr2 = results.filter((item) => item.type === "1" || item.type === "2");
          // map保存每个qno、type的mistake个数
          let map = new Map();
          arr2.forEach((item) => {
            let key = item.qno + "-" + item.type;
            if (map.has(key)) {
              let value = item.mistake === 0 ? map.get(key) : map.get(key) + 1;
              map.set(key, value);
            } else {
              let value = item.mistake === 0 ? 0 : 1;
              map.set(key, value);
            }
          });
          // 数组arr3
          let arr3 = [];
          for (let v of map) {
            let key = v[0];
            let index = key.indexOf("-");
            let qno = Number(key.substring(0, index));
            let type = key.substring(index + 1);
            arr3.push({ qno, type, rate: 100 - (v[1] / snoCount) * 100 });
          }
          // 连接数组1、数组3，结果放入数组4
          let arr4 = [];
          arr1.forEach((item1) => {
            let obj = arr3.find((item2) => item1.qno === item2.qno && item1.type === item2.type);
            if (obj) {
              arr4.push({ rate: obj.rate, queNo: item1.queNo });
            }
          });
          res.send(arr4);
        });
      });
    });
  });
};
