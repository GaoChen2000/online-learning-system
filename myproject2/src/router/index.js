import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 主页面
const Login = () => import("@/views/login/Login.vue");
const Register = () => import("@/views/register/Register.vue");
const studentHome = () => import("@/views/student/StudentHome.vue");
const teacherHome = () => import("@/views/teacher/TeacherHome.vue");
const adminHome = () => import("@/views/admin/AdminHome.vue");
const self = () => import("@/views/self/Self.vue");

// 学生的嵌套路由
const stuNews = () => import("@/views/student/childComps/StuNews.vue");
const stuHomework = () => import("@/views/student/childComps/StuHomework.vue");
const stuDiscussion = () =>
  import("@/views/student/childComps/StuDiscussion.vue");
const stuMistake = () => import("@/views/student/childComps/StuMistake.vue");
const stuAnalysis = () => import("@/views/student/childComps/StuAnalysis.vue");
const stuResource = () => import("@/views/student/childComps/StuResource.vue");

// 老师的嵌套路由
const teaHomework = () => import("@/views/teacher/childComps/TeaHomework.vue");
const teaNews = () => import("@/views/teacher/childComps/TeaNews.vue");
const teaReview = () => import("@/views/teacher/childComps/TeaReview.vue");
const teaDiscussion = () =>
  import("@/views/teacher/childComps/TeaDiscussion.vue");
const teaQuestions = () =>
  import("@/views/teacher/childComps/TeaQuestions.vue");
const teaResource = () => import("@/views/teacher/childComps/TeaResource.vue");
const teaAnalysis = () => import("@/views/teacher/childComps/TeaAnalysis.vue");

// 管理员的嵌套路由
const adminClass = () => import("@/views/admin/childComps/AdminClass.vue");
const adminDiscussion = () =>
  import("@/views/admin/childComps/AdminDiscussion.vue");

// 二级页面
// 学生的二级页面
const stuHomeworkDetail = () =>
  import("@/views/student/childComps/secondPage/StuHomeworkDetail.vue");
const StuHomeworkQuestions = () =>
  import("@/views/student/childComps/secondPage/StuHomeworkQuestions.vue");
const StuDisDetail = () =>
  import("@/views/student/childComps/secondPage/StuDisDetail.vue");
const StuResDetail = () =>
  import("@/views/student/childComps/secondPage/StuResDetail.vue");
const StuMisDetail = () =>
  import("@/views/student/childComps/secondPage/StuMisDetail.vue");

// 老师的二级页面
const teaHomeworkDetail = () =>
  import("@/views/teacher/childComps/secondPage/TeaHomeworkDetail.vue");
const TeaNewHomework = () =>
  import("@/views/teacher/childComps/secondPage/TeaNewHomework.vue");
const TeaDisDetail = () =>
  import("@/views/teacher/childComps/secondPage/TeaDisDetail.vue");
const TeaQueDetail = () =>
  import("@/views/teacher/childComps/secondPage/TeaQueDetail.vue");
const TeaMakeNews = () =>
  import("@/views/teacher/childComps/secondPage/TeaMakeNews.vue");
const TeaReviewDetail = () =>
  import("@/views/teacher/childComps/secondPage/TeaReviewDetail.vue");
const TeaRevQueDetail = () =>
  import("@/views/teacher/childComps/secondPage/TeaRevQueDetail.vue");
const TeaRevQueDetail2 = () =>
  import("@/views/teacher/childComps/secondPage/TeaRevQueDetail2.vue");
const TeaAnaDetail = () =>
  import("@/views/teacher/childComps/secondPage/TeaAnaDetail.vue");
const TeaQueNew = () =>
  import("@/views/teacher/childComps/secondPage/TeaQueNew.vue");
const TeaQueNewXz = () =>
  import("@/views/teacher/childComps/secondPage/TeaQueNewXz.vue");
const TeaQueNewTk = () =>
  import("@/views/teacher/childComps/secondPage/TeaQueNewTk.vue");
const TeaQueNewJd = () =>
  import("@/views/teacher/childComps/secondPage/TeaQueNewJd.vue");
const TeaQueNewJs = () =>
  import("@/views/teacher/childComps/secondPage/TeaQueNewJs.vue");
const TeaNewDis = () =>
  import("@/views/teacher/childComps/secondPage/TeaNewDis.vue");

// 管理员的二级页面
const AdminDisDetail = () =>
  import("@/views/admin/childComps/secondPage/AdminDisDetail.vue");

// 嵌套路由
// 学生的嵌套路由
const studentChildren = [
  {
    path: "",
    redirect: "news",
  },
  {
    path: "news",
    component: stuNews,
  },
  {
    path: "homework",
    component: stuHomework,
  },
  {
    path: "discussion",
    component: stuDiscussion,
  },
  {
    path: "mistake",
    component: stuMistake,
  },
  {
    path: "analysis",
    component: stuAnalysis,
  },
  {
    path: "resource",
    component: stuResource,
  },
];

// 老师的嵌套路由
const teacherChildren = [
  {
    path: "",
    redirect: "homework",
  },
  {
    path: "homework",
    component: teaHomework,
  },
  {
    path: "news",
    component: teaNews,
  },
  {
    path: "review",
    component: teaReview,
  },
  {
    path: "discussion",
    component: teaDiscussion,
  },
  {
    path: "questions",
    component: teaQuestions,
  },
  {
    path: "resource",
    component: teaResource,
  },
  {
    path: "analysis",
    component: teaAnalysis,
  },
];

// 管理员的嵌套路由
const adminChildren = [
  {
    path: "",
    redirect: "discussion",
  },
  {
    path: "class",
    component: adminClass,
  },
  {
    path: "discussion",
    component: adminDiscussion,
  },
];

// 二级页面的路由
// 学生的二级页面的路由
const stuSecondPage = [
  {
    path: "/student/homework/homeworkDetail",
    component: stuHomeworkDetail,
  },
  {
    path: "/student/homework/questions",
    component: StuHomeworkQuestions,
  },
  {
    path: "/student/discussion/detail",
    component: StuDisDetail,
  },
  {
    path: "/student/resource/detail",
    component: StuResDetail,
  },
  {
    path: "/student/mistake/detail",
    component: StuMisDetail,
  },
];

// 老师的二级页面的路由
const teaSecondPage = [
  {
    path: "/teacher/homework/detail",
    component: teaHomeworkDetail,
  },
  {
    path: "/teacher/homework/new",
    component: TeaNewHomework,
  },
  {
    path: "/teacher/discussion/detail",
    component: TeaDisDetail,
  },
  {
    path: "/teacher/discussion/new",
    component: TeaNewDis,
  },
  {
    path: "/teacher/questions/detail",
    component: TeaQueDetail,
  },
  {
    path: "/teacher/news/new",
    component: TeaMakeNews,
  },
  {
    path: "/teacher/review/all",
    component: TeaReviewDetail,
  },
  {
    path: "/teacher/review/detail",
    component: TeaRevQueDetail,
  },
  {
    path: "/teacher/review/detail2",
    component: TeaRevQueDetail2,
  },
  {
    path: "/teacher/analysis/detail",
    component: TeaAnaDetail,
  },
  {
    path: "/teacher/questions/new",
    component: TeaQueNew,
  },
  {
    path: "/teacher/questions/xz",
    component: TeaQueNewXz,
  },
  {
    path: "/teacher/questions/tk",
    component: TeaQueNewTk,
  },
  {
    path: "/teacher/questions/jd",
    component: TeaQueNewJd,
  },
  {
    path: "/teacher/questions/js",
    component: TeaQueNewJs,
  },
];

// 管理员的二级页面路由
const adminSecondPage = [
  {
    path: "/admin/discussion/detail",
    component: AdminDisDetail,
  },
];

// 主页面的路由
const viewsRoutes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      notRequireToken: true,
    },
    component: Login,
  },
  {
    path: "/register",
    meta: {
      notRequireToken: true,
    },
    component: Register,
  },
  {
    path: "/news",
    component: stuNews,
  },
  {
    path: "/student",
    component: studentHome,
    children: studentChildren,
  },
  {
    path: "/teacher",
    component: teacherHome,
    children: teacherChildren,
  },
  {
    path: "/admin",
    component: adminHome,
    children: adminChildren,
  },
  {
    path: "/self",
    component: self,
  },
];

// 二级页面的路由
const secondPageRoutes = [
  ...stuSecondPage,
  ...teaSecondPage,
  ...adminSecondPage,
];
// 路由
const routes = [...viewsRoutes, ...secondPageRoutes];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 全局导航守卫
router.beforeEach(function (to, from, next) {
  // 不需要token已登录的页面，直接可以进入
  if (to.meta.notRequireToken) {
    next();
  } else {
    // 需要token已登录的页面，要先判断是否具有token已登录
    // 已登录，则直接进入
    if (sessionStorage.getItem("token")) {
      next();
    } else {
      // 未登录，则跳转到登录页面
      setTimeout(() => {
        next("/");
      }, 1000);
    }
  }
});
export default router;
