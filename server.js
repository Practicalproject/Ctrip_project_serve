// 引入配置文件 用来定义全局配置
const { PORT } = require("./config")

// 引入koa并注册koa实例
const Koa = require("koa")
const app = new Koa()

// 引入koa-router并注册koa-router实例
const KoaRouter = require("koa-router")
const ruoter = new KoaRouter()

// 设置路由



// 挂载端口
app.listen(PORT, (error) => {
    if (error) {
        console.log("服务启动失败!")
        return
    }
    console.log(`服务启动成功,${PORT} 端口已打开~`)
})