$(function () {
    let layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 点击上传按钮，模拟文件域
    $("#uploadBtn").click(function () {
        $("#file").click();
    })
    // 文件域改变事件
    $("#file").on("change", function () {
        // 当选择的文件改变了，该事件就会触发
        let file = this.files[0]; //DOM对象

        // 把选择的文件得到对应的URL地址
        var newImgURL = URL.createObjectURL(file);

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 上传头像
    $("#sureBtn").click(function () {
        let dataURL = $image
            .cropper("getCroppedCanvas", {
                width: 100,
                height: 100,
            })
            .toDataURL("image/png");
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar:dataURL,
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("更换头像失败！")
                }

                layer.msg("更换头像成功！")
                // 调用父页面的函数，从而获取头像
                window.parent.fn_aj();
            }
        })
    })
})