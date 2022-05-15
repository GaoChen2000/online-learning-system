// 将查询结果results，转换成 in 格式：(1,2,3,4,5)
exports.resToInArr = (results, key) => {
  if (results.length === 0) {
    return "";
  }
  let str = "";
  results.forEach((item) => {
    str += item[key] + ",";
  });
  str = "(" + str.substring(0, str.length - 1) + ")";
  return str;
};

// 对查询结果results，按时间先后排序（时间离现在近的排在前面），传入按哪一个属性排序，修改原数组
exports.sortByTime = (arr, key) => {
  if (arr.length <= 1) {
    return;
  }
  arr.sort((x, y) => {
    if (x[key] < y[key]) {
      return 1;
    } else {
      return -1;
    }
  });
};

// 对数据库返回的datetime 类型的数据，进行格式化，变为 2022-4-1 的格式
exports.formatTime = (time) => {
  let year = time.getFullYear().toString();
  let month = (time.getMonth() + 1).toString();
  let date = time.getDate().toString();
  return year + "-" + month + "-" + date;
};

// 对数据库查询结果results，将其中的 datetime 类型的数据，进行格式化，修改原数组
exports.resFormatTime = (arr, key) => {
  if (arr.length === 0) {
    return;
  }
  arr.forEach((item) => {
    item[key] = exports.formatTime(item[key]);
  });
};

// 连接 2个数组，根据给出的 link_key 相同来进行连接，内容放到 arr1 中，返回 arr1
exports.linkArr = (arr1, arr2, link_key) => {
  arr1.forEach((item1) => {
    arr2.forEach((item2) => {
      if (item1.link_key === item2.link_key) {
      }
    });
  });
};

// 将从question_xz表中查找出的结果转换成前端需要的格式（选择题）
exports.format_xz = (arr) => {
  let res = [];
  arr.forEach((item) => {
    let options = [];
    if (item.A) {
      options.push(item.A);
    }
    if (item.B) {
      options.push(item.B);
    }
    if (item.C) {
      options.push(item.C);
    }
    if (item.D) {
      options.push(item.D);
    }
    if (item.E) {
      options.push(item.E);
    }
    if (item.F) {
      options.push(item.F);
    }
    let obj = {};
    obj.value = options;
    obj.type = "1";
    obj.qno = item.qno;
    obj.content = item.content;
    obj.answer = item.answer;
    obj.analysis = item.analysis;
    res.push(obj);
  });
  return res;
};

// 将从question表中查找出的结果转换成前端需要的格式，只是加上type属性（不包括选择题）
exports.format_que = (arr, type) => {
  arr.forEach((item) => {
    item.type = type;
  });
};

// 使用于results数组，拥有type属性
// 会按照type分组，然后查找question表，并处理成前端需要的形式
// 此方法包含异步代码，使用时，需要在方法外面加上 new Promise，在 then 中可以拿到 arr2
// arr是需要按type分组的数组，arr2是传入的保存最终数据的数组，outResolve是传入的外部的 new Promise 的 resolve
exports.makeQueArr = (arr, db, res, arr2, outResolve) => {
  // 将题目按type分组
  let xz = [];
  let tk = [];
  let jd = [];
  let js = [];
  arr.forEach((item) => {
    if (item.type === "1") xz.push(item);
    else if (item.type === "2") tk.push(item);
    else if (item.type === "3") jd.push(item);
    else if (item.type === "4") js.push(item);
  });
  // 将每个分组的qno转换成in格式
  let xzStr = exports.resToInArr(xz, "qno");
  let tkStr = exports.resToInArr(tk, "qno");
  let jdStr = exports.resToInArr(jd, "qno");
  let jsStr = exports.resToInArr(js, "qno");
  // 获取题目信息，并将不同题目数组，转换成前端需要的格式
  let p = new Promise((resolve, reject) => {
    if (xzStr !== "") {
      db.query("select * from question_xz where qno in " + xzStr, (err, results) => {
        if (err) return res.cc(err);
        xz = exports.format_xz(results);
        arr2.push(...xz);
        resolve();
      });
    } else {
      resolve();
    }
  });
  p.then(() => {
    return new Promise((resolve, reject) => {
      if (tkStr !== "") {
        db.query("select * from question_tk where qno in " + tkStr, (err, results) => {
          if (err) return res.cc(err);
          exports.format_que(results, "2");
          arr2.push(...results);
          resolve();
        });
      } else {
        resolve();
      }
    });
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        if (jdStr !== "") {
          db.query("select * from question_jd where qno in " + jdStr, (err, results) => {
            if (err) return res.cc(err);
            exports.format_que(results, "3");
            arr2.push(...results);
            resolve();
          });
        } else {
          resolve();
        }
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        if (jsStr !== "") {
          db.query("select * from question_js where qno in " + jsStr, (err, results) => {
            if (err) return res.cc(err);
            exports.format_que(results, "4");
            arr2.push(...results);
            resolve();
            outResolve();
          });
        } else {
          resolve();
          outResolve();
        }
      });
    });
};
