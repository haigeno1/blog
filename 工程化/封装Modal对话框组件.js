// ttodo 
// 1. 封装一个Modal对话框组件，输入是对话框内容html,按钮以及回调
// 直接引入antdesign的Modal即可实现3个功能。
// 如果用原生js封装，是一个class, 对话框内容html,按钮以及回调。需要创建元素并处理很多样式问题。
class Modal {
    constructor(options) {
        const { innerHtml, button, callback } = options
    }
    // 创建 div以及处理样式问题
    creatDom() {
        // 调用HTML的api
        const divOuter = document.createElement('div')
        const divInner = document.createElement('div')
        const ButtonHtml = document.createElement('div')
        divInner.innerHTML = innerHtml
        // 处理样式问题
        divOuter.style = ''
        // 添加事件监听
        ButtonHtml.addEventListener('click', () => {
            callback()
            // divOuter display: none
        })
        divOuter.appendChild(divInner)
        divOuter.appendChild(ButtonHtml)
        document.body.appendChild(div)
    }
    open() {
        this.creatDom()
    }
}


// 使用的时候 
const m = new Modal({ innerHtml: 'content', button: 'confirm', callback: () => { } })
m.open()
m.close()

