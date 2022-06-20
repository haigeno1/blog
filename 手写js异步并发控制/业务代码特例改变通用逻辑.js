// Axios统一错误处理与后置
// https://segmentfault.com/a/1190000016515512

// 由业务代码决定是否隐藏统一错误提示

request.interceptors.response.use(
    (response) => response.data,
    (error) => {
        //   ...
        let isShowNormalError = true
        // 标识是否调用
        const hideNormalError = () => isShowNormalError = false

        // 这里就知道业务代码有没有调用 上面的通用逻辑了 用一个变量标识是否调用 调用时机很巧妙
        setTimeout(() => {
            if (isShowNormalError) {
                // 这里也可以调异步函数 等异步resloved后再调后面的逻辑
                Message.error(msg)
            }
        })

        return Promise.reject({ ...error.response, hideNormalMessage }) // 在error.response上添加方法
    }
)



someAPIFN()
    .then(
        () => { },
        ({ data, hideNormalMessage }) => {
            // 业务代码
            hideNormalMessage()
        }
    )