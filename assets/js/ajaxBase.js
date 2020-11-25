// ajax的基本配置

// $.ajaxPrefilter(function (options) {
//   // 在每次jQ发送ajax请求前会执行该函数，通过该函数的形参options可以获取到每次ajax的配置项
//   // 来修改每次请求的配置项
//   options.url = "http://ajax.frontend.itheima.net" + options.url;
//   console.log(options.url);
// });

$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  console.log(options.url);

  // 处理头信息
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token"),
    }
  }
  options.complete = function (xhr) {
    // 请求完成才会执行的函数(不论失败还是成功都会执行的)
    // 形参可以获取的jQuery封装的ajax对象xhr
    // console.log(xhr);
    if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === "身份认证失败！") {
      localStorage.removeItem("token")
      location.href = "login.html";
    }
  };
})