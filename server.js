const express = require("express");
const { resolve } = require("path");
const { SERVER_CONFIG } = require("./config");
// 引入中间件
// const cors = require("./middlleware/cors");
// 引入路由
const loginRouter = require("./routers/login");
const logoutRouter = require("./routers/logout");
const commonRouter = require("./routers/common");
const app = express();

// 引入数据库
(async()=>{
	try {
		await require("./db/mongo");
		console.log('本地数据库连接成功！');
		app.use(express.static(resolve(__dirname, "./public")));

		// 内置中间件：用来解析POST请求体参数
		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());

		// 使用中间件
		// app.use(cors);

		// 应用 路由器中间件
		app.use("/common", commonRouter);
		app.use("/login", loginRouter);
		app.use(logoutRouter);

		app.listen(SERVER_CONFIG.port, SERVER_CONFIG.host, (err) => {
			if (!err){
				console.log(
					`服务器启动成功: http://${SERVER_CONFIG.host}:${SERVER_CONFIG.port}`
				);
				console.log(
					`api接口文档地址: http://${SERVER_CONFIG.host}:${SERVER_CONFIG.port}/docs`
				);
			}
			else console.log(err);
		});

	} catch (error) {
		console.log(error);
	}
})()
