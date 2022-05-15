import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 和创建新作业相关的数据
    newHomeworkInfo: {},
    chosenQueArr: [],
    comeFromHomework: false,
    // 和作业评分相关的数据
    reviewArr: [],
    // 和保存作业答案相关的数据
    stuAnsArr: [],
    // 保存创建的习题
    newQueInfo: {
      xz: {},
      tk: {},
      jd: {},
      js: {},
    },
    // 标识第几次创建习题
    newQueIndex: {
      xz: 0,
      tk: 0,
      jd: 0,
      js: 0,
    },
  },
  mutations: {
    // 获得数据
    putNewHomeworkInfo(state, payload) {
      state.newHomeworkInfo = payload;
    },
    putChosenQueArr(state, payload) {
      state.chosenQueArr.push(...payload);
    },
    putReviewArr(state, payload) {
      state.reviewArr = payload;
    },
    // 改变数据
    changeComeFromHomework(state, payload) {
      state.comeFromHomework = payload;
    },
    // 清空数据
    clearNewHomeworkInfo(state) {
      state.newHomeworkInfo = {};
    },
    clearChosenQueArr(state) {
      state.chosenQueArr = [];
    },
    // 提交作业答案时，每个题目组件监听到hasSave的变化，将数据插入到vuex的stuAnsArr中
    submitStuAns(state, payload) {
      state.stuAnsArr.push(payload);
    },
    // 清空作业答案
    clearStuAns(state) {
      state.stuAnsArr = [];
    },
    // 添加创建的习题信息
    setNewQueInfo(state, payload) {
      let data = payload.data;
      let type = payload.type;
      if (type === "xz")
        state.newQueInfo.xz = { ...state.newQueInfo.xz, ...data };
      else if (type === "tk")
        state.newQueInfo.tk = { ...state.newQueInfo.tk, ...data };
      else if (type === "jd")
        state.newQueInfo.jd = { ...state.newQueInfo.jd, ...data };
      else if (type === "js")
        state.newQueInfo.js = { ...state.newQueInfo.js, ...data };
    },
    // 修改标识第几次创建习题
    setNewQueIndex(state, payload) {
      if (payload === "xz") state.newQueIndex.xz++;
      else if (payload === "tk") state.newQueIndex.tk++;
      else if (payload === "jd") state.newQueIndex.jd++;
      else if (payload === "js") state.newQueIndex.js++;
    },
    // 清空newQueInfo、newQueIndex
    clearNewQueInfoNewQueIndex(state) {
      state.newQueInfo = {
        xz: {},
        tk: {},
        jd: {},
        js: {},
      };
      state.newQueIndex = {
        xz: 0,
        tk: 0,
        jd: 0,
        js: 0,
      };
    },
    // 保存作业答案
    // saveStuAns(state, payload) {
    //   state.stuAnsArr.push(payload);
    //   let str = "";
    //   state.stuAnsArr.forEach((item) => {
    //     str = str + JSON.stringify(item) + "-=-";
    //   });
    //   str = str.substring(0, str.length - 3);
    //   localStorage.setItem("stuAnsArr", str);
    // },
    // 清空作业答案
    // clearStuAns(state) {
    //   state.stuAnsArr = [];
    // },
    // 将localStorage解析后的数组，赋值给stuAnsArr
    // getLocalStorageToState(state, payload) {
    //   state.stuAnsArr = payload;
    // },
  },
  actions: {},
  modules: {},
});
export default store;
