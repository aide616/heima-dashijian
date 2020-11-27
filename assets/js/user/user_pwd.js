$(function () {
    let form = layui.form;
    let layer = layui.layer;
    // 校验
    form.verify({
        // 密码校验
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验原密码和新密码是否一致
        newPwd: function(value,item) {
            // value 新密码的的内容
            let oldPwd = $("[name=oldPwd]").val();
            // console.log(oldPwd, value);
            if (value === oldPwd) {
                return "新密码不能和原密码一致！"
            }
        },
        // 两次输入的密码是否一致
        samePwd: function(value, item) {
            let newPwd = $("[name=newPwd]").val();
            if (value !== newPwd) {
                return "两次输入的密码不相同！"
            }
        }
    });

    // 提交表单 密码重置
    $("#pwdForm").on("submit",function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("重置密码失败! " + res.message)
                }
                layer.msg("重置密码成功!");
                $("#pwdForm").get(0).reset(); 
            }
        })
    })
})