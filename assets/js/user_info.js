$(function () {

    let form = layui.form;
    let layer = layui.layer;




    getinfo();
    function getinfo() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                // /给表单赋值
                form.val("formTest", res.data);
            }
        })
    }
    

    // 重置功能
    $("#resetBtn").click(function (e) {
        e.preventDefault(); 
        getinfo();
    })


    // 提交表单数据-修改用户信息
    $("#userForm").submit(function (e) {
        e.preventDefault();

        let data = $(this).serialize();
        console.log(data);

    $.ajax({
        type: "POST",
        url: "/my/userinfo",
        data,
        success: function(res) {
            console.log(res); 

            if (res.status !== 0) {
                return layer.msg("修改用户信息失败");
            }

            layer.msg("修改用户信息成功");

            // console.log(window.parent.fn_aj);
            window.parent.fn_aj();
        }
    });
    });


    // 添加表单校验功能
    form.verify({
        nickname: function (value,item) {
            if (value.length > 6) {
                return "昵称长度必须在1-6字符之间";
            }
        }
    })
});
