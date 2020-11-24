$(function () {
    // 去注册账号
    $("#gotoRegi").click(function () {
        // console.log($(".regiBox"));
        $(".regiBox").show();
        $(".loginBox").hide();
    })

    // 去登陆账号
    $("#gotoLogin").click(function () {
        // console.log($(".regiBox"));
        $(".regiBox").hide();
        $(".loginBox").show();
    })



    // 从layui中获取到form表单的功能
    let form = layui.form;
    let layer = layui.layer;

    // 表单校验
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value, item) {
            // 获取注册表单中密码框的内容
            let pwd = $(".regiBox input[name=password]").val();
            console.log(pwd);
            if (value !== pwd) {
                // 提示文字
                return "两次输入的密码不一致!";
            }
        }
    });
    // 注册的ajax代码
    $("#regiForm").on("submit", function (e) {
        e.preventDefault();

        // 收集表单数据
        let data = $(this).serialize();
        // console.log(data);
        // return
        // 直接发送ajax请求
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败' + res.message);
                }

                layer.msg('注册成功');

                // 注册成功跳转到登录页面
                $("#gotoLogin").click();
            }
        })
    });


    // 登录的ajax代码
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        // 收集表单数据
        let data = $(this).serialize();

        $.ajax({
            type: "POST",
            url: "/api/login",
            data,
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }

                // 登录成功
                // 1. 提示框 ==> layer.msg
                
                // 2. 需要将token存储到本地中(localStorage)
                // res.token 本身就是字符串，可以直接存储
                // localStorage.setItem("token", res.token);
                localStorage.setItem("token", res.token);
                // 3. 跳转页面操作
                layer.msg('登陆成功！，即将去后台主页', {
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    location.href = "index.html";
                });

            }
        })
    })
})