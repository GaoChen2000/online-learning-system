// 格式化时间
export function formatTime(time) {
  let year = time.getFullYear().toString();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours() > 9 ? time.getHours() : "0" + time.getHours();
  let minutes =
    time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
  return `${year}-${month}-${day}  ${hour}:${minutes}`;
}
