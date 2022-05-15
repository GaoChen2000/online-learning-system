// 错误处理的中间件函数
exports.cc = (err, status) => {
  let message = err instanceof Error ? err.message : err;
  console.log(message);
};
