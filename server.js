const express = require('express')
//引入db模块---用于连接数据库
const db = require('./db')

//引入student模型对象---用于增删改查用户
const userModel = require('./models/userModel')

//引入cookie-parser，用于解析cookie
const cookieParser = require('cookie-parser')

//引入express-session，用于操作session
const session = require('express-session');

//引入connect-mongo，用于做session的持久化(非必须)
const MongoStore = require('connect-mongo')(session);

//引入md5加密
const md5 = require('md5');
const e = require('express');
// const sha1 = require('sha1')

//创建一个服务对象
const app = express()

//应用中间件
//解析请求体中urlencoded编码的参数为一个对象
app.use(express.urlencoded({ extended: true }))

//解析请求体中json编码的参数为一个对象
app.use(express.json())

//应用解析cookie的中间件
app.use(cookieParser())

//配置express中操作session
app.use(session({
	name: 'session_id',   //设置cookie的name
	saveUninitialized: false, //是否在存储内容之前创建会话
	secret: 'ctrip', //参与加密的字符串（又称签名）
	cookie: {
		httpOnly: true, // 开启后前端无法通过 JS 操作cookie
		maxAge: 1000 * 60 * 60 // 设置cookie的过期时间
	},
	store: new MongoStore({
		url: 'mongodb://localhost:27017/ctrip_sessions_container',
	})
}))


	; (async () => {
		//等待数据库连接
		await db

		//#region 登陆注册的接口
		//响应用户注册
		app.post('/register', async (request, response) => {
			//获取客户端传递过来的：邮箱、密码、昵称
			const { email, pwd, nick_name } = request.body
			//去数据库中查询该用户是否注册过
			const findResult = await userModel.findOne({ email })
			//若未注册
			if (!findResult) {
				await userModel.create({ email, pwd: md5(pwd), nick_name })
				response.send({
					code: 20000,
					msg: '注册成功！',
					data: {}
				})
			} else {
				response.send({
					code: 20001,
					msg: '用户已注册！',
					data: {}
				})
			}
		})


		//用户登录
		app.post('/login', async (request, response) => {
			//获取客户端传递过来的：邮箱、密码、昵称
			const { email, pwd } = request.body
			//去数据库中查询该用户是否注册过
			const findResult = await userModel.findOne({ email, pwd: md5(pwd) })
			//若登录成功
			if (findResult) {
				request.session._id = findResult._id
				response.send({
					code: 20000,
					msg: '登录成功！',
					data: findResult
				})
			} else {
				//登录失败
				response.send({
					code: 20001,
					msg: '登录失败！',
					data: {}
				})
			}
		})
		// 验证是否登陆
		app.post('/verify_login', async (request, response) => {
			const { _id } = request.session
			const findResult = await userModel.findOne({ _id })
			if (findResult) {
				response.send({
					code: 20000,
					msg: '验证身份成功！',
					data: findResult
				})
			} else {
				response.send({
					code: 20001,
					msg: '用户身份不合法，请重新登录',
					data: findResult
				})
			}
		})
			//#endregion

			//#region 热门 获取携程首页第一板块 热门 列表
			; (function () {
				let JingNei = require("./datas/remen/JingNei.json")	//境内
				let RiBen = require("./datas/remen/RiBen.json")	//日本
				let DongNanYa = require("./datas/remen/DongNanYa.json")	//东南亚
				let OuZhou = require("./datas/remen/OuZhou.json")	//欧洲
				let MeiZhou = require("./datas/remen/MeiZhou.json")	//美洲
				let AoZhongDongFei = require("./datas/remen/AoZhongDongFei.json")	//澳中东非

				app.get('/getIndexHot', async (request, response) => {
					let { diqu } = request.query
					if (diqu === "JingNei") {
						response.send({
							code: 200,
							msg: 'ok',
							data: JingNei
						})
						return
					} else if (diqu === "RiBen") {
						response.send({
							code: 200,
							msg: 'ok',
							data: RiBen
						})
						return
					} else if (diqu === "DongNanYa") {
						response.send({
							code: 200,
							msg: 'ok',
							data: DongNanYa
						})
						return
					} else if (diqu === "OuZhou") {
						response.send({
							code: 200,
							msg: 'ok',
							data: OuZhou
						})
						return
					} else if (diqu === "MeiZhou") {
						response.send({
							code: 200,
							msg: 'ok',
							data: MeiZhou
						})
						return
					} else if (diqu === "AoZhongDongFei") {
						response.send({
							code: 200,
							msg: 'ok',
							data: AoZhongDongFei
						})
						return
					}
				})
			})()
			//#endregion

			//#region 周边游 获取携程首页第一板块 周边游 列表
			; (function () {
				let JingXuan = require("./datas/zhoubianyou/JingXuan.json")	//精选
				let ShangHai = require("./datas/zhoubianyou/ShangHai.json")	//上海
				let HangZhou = require("./datas/zhoubianyou/HangZhou.json")	//杭州
				let SuZhou = require("./datas/zhoubianyou/SuZhou.json")	//苏州
				let HuangShan = require("./datas/zhoubianyou/HuangShan.json")	//黄山
				let NanJing = require("./datas/zhoubianyou/NanJing.json")	//南京
				let ZhouShan = require("./datas/zhoubianyou/ZhouShan.json")	//舟山
				let NingBo = require("./datas/zhoubianyou/NingBo.json")	//宁波
				let AnJi = require("./datas/zhoubianyou/AnJi.json")	//安吉
				let WuXi = require("./datas/zhoubianyou/WuXi.json")	//无锡

				app.get('/getIndexSurrounding', async (request, response) => {
					let { diqu } = request.query
					if (diqu === "JingXuan") {
						response.send({
							code: 200,
							msg: 'ok',
							data: JingXuan
						})
						return
					} else if (diqu === "ShangHai") {
						response.send({
							code: 200,
							msg: 'ok',
							data: ShangHai
						})
						return
					} else if (diqu === "HangZhou") {
						response.send({
							code: 200,
							msg: 'ok',
							data: HangZhou
						})
						return
					} else if (diqu === "SuZhou") {
						response.send({
							code: 200,
							msg: 'ok',
							data: SuZhou
						})
						return
					} else if (diqu === "HuangShan") {
						response.send({
							code: 200,
							msg: 'ok',
							data: HuangShan
						})
						return
					} else if (diqu === "NanJing") {
						response.send({
							code: 200,
							msg: 'ok',
							data: NanJing
						})
						return
					} else if (diqu === "ZhouShan") {
						response.send({
							code: 200,
							msg: 'ok',
							data: ZhouShan
						})
						return
					} else if (diqu === "NingBo") {
						response.send({
							code: 200,
							msg: 'ok',
							data: NingBo
						})
						return
					} else if (diqu === "AnJi") {
						response.send({
							code: 200,
							msg: 'ok',
							data: AnJi
						})
						return
					} else if (diqu === "WuXi") {
						response.send({
							code: 200,
							msg: 'ok',
							data: WuXi
						})
						return
					}
				})
			})()
			//#endregion

			//#region 门票 获取携程首页第一板块 门票 列表
			; (function () {
				let ShangHai = require("./datas/menpiao/ShangHai.json")	//上海
				let LongYou = require("./datas/menpiao/LongYou.json")	//龙游
				let ZuoYang = require("./datas/menpiao/ZuoYang.json")	//溧阳
				let GaoYou = require("./datas/menpiao/GaoYou.json")	//高邮
				let SheYang = require("./datas/menpiao/SheYang.json")	//射阳
				let YangZhou = require("./datas/menpiao/YangZhou.json")	//扬州
				let HeXian = require("./datas/menpiao/HeXian.json")	//和县
				let HaiAn = require("./datas/menpiao/HaiAn.json")	//海安

				app.get('/getIndexTickets', async (request, response) => {
					let { diqu } = request.query
					if (diqu === "ShangHai") {
						response.send({
							code: 200,
							msg: 'ok',
							data: ShangHai
						})
						return
					} else if (diqu === "LongYou") {
						response.send({
							code: 200,
							msg: 'ok',
							data: LongYou
						})
						return
					} else if (diqu === "ZuoYang") {
						response.send({
							code: 200,
							msg: 'ok',
							data: ZuoYang
						})
						return
					} else if (diqu === "GaoYou") {
						response.send({
							code: 200,
							msg: 'ok',
							data: GaoYou
						})
						return
					} else if (diqu === "SheYang") {
						response.send({
							code: 200,
							msg: 'ok',
							data: SheYang
						})
						return
					} else if (diqu === "YangZhou") {
						response.send({
							code: 200,
							msg: 'ok',
							data: YangZhou
						})
						return
					} else if (diqu === "HeXian") {
						response.send({
							code: 200,
							msg: 'ok',
							data: HeXian
						})
						return
					} else if (diqu === "HaiAn") {
						response.send({
							code: 200,
							msg: 'ok',
							data: HaiAn
						})
						return
					}
				})
			})()
			//#endregion

			//#region 出境游 获取携程首页第一板块 出境游 列表
			; (function () {
				let JingXuan = require("./datas/chujingyou/JingXuan.json")	//精选
				let RiBen = require("./datas/chujingyou/RiBen.json")	//日本
				let ZhongGuoAoMen = require("./datas/chujingyou/ZhongGuoAoMen.json")	//中国澳门
				let TaiGuo = require("./datas/chujingyou/TaiGuo.json")	//泰国
				let MaErDaiFu = require("./datas/chujingyou/MaErDaiFu.json")	//马尔代夫
				let BingDao = require("./datas/chujingyou/BingDao.json")	//冰岛
				let RuiShi = require("./datas/chujingyou/RuiShi.json")	//瑞士
				let XinJiaPo = require("./datas/chujingyou/XinJiaPo.json")	//新加坡
				let DongJing = require("./datas/chujingyou/DongJing.json")	//东京
				let PuJiDao = require("./datas/chujingyou/PuJiDao.json")	//普吉岛

				app.get('/getIndexOverseas', async (request, response) => {
					let { diqu } = request.query
					if (diqu === "JingXuan") {
						response.send({
							code: 200,
							msg: 'ok',
							data: JingXuan
						})
						return
					} else if (diqu === "RiBen") {
						response.send({
							code: 200,
							msg: 'ok',
							data: RiBen
						})
						return
					} else if (diqu === "ZhongGuoAoMen") {
						response.send({
							code: 200,
							msg: 'ok',
							data: ZhongGuoAoMen
						})
						return
					} else if (diqu === "TaiGuo") {
						response.send({
							code: 200,
							msg: 'ok',
							data: TaiGuo
						})
						return
					} else if (diqu === "MaErDaiFu") {
						response.send({
							code: 200,
							msg: 'ok',
							data: MaErDaiFu
						})
						return
					} else if (diqu === "BingDao") {
						response.send({
							code: 200,
							msg: 'ok',
							data: BingDao
						})
						return
					} else if (diqu === "RuiShi") {
						response.send({
							code: 200,
							msg: 'ok',
							data: RuiShi
						})
						return
					} else if (diqu === "XinJiaPo") {
						response.send({
							code: 200,
							msg: 'ok',
							data: XinJiaPo
						})
						return
					} else if (diqu === "DongJing") {
						response.send({
							code: 200,
							msg: 'ok',
							data: DongJing
						})
						return
					} else if (diqu === "PuJiDao") {
						response.send({
							code: 200,
							msg: 'ok',
							data: PuJiDao
						})
						return
					}
				})
			})()
			//#endregion


			//#region 获取携程首页 海外酒店 板块数据
			; (function () {
				let ReMenChengShi = require("./datas/haiwaijiudian/ReMenChengShi.json")
				let DuShiGouWu = require("./datas/haiwaijiudian/DuShiGouWu.json")
				let HaiDaoXiuXian = require("./datas/haiwaijiudian/HaiDaoXiuXian.json")
				let LuYouShengDi = require("./datas/haiwaijiudian/LuYouShengDi.json")
				app.get('/getIndexHotel', async (request, response) => {
					let { dq } = request.query
					if (dq === "ReMenChengShi") {
						response.send({
							code: 200,
							msg: 'ok',
							data: ReMenChengShi
						})
						return
					} else if (dq === "DuShiGouWu") {
						response.send({
							code: 200,
							msg: 'ok',
							data: DuShiGouWu
						})
						return
					} else if (dq === "HaiDaoXiuXian") {
						response.send({
							code: 200,
							msg: 'ok',
							data: HaiDaoXiuXian
						})
						return
					} else if (dq === "LuYouShengDi") {
						response.send({
							code: 200,
							msg: 'ok',
							data: LuYouShengDi
						})
						return
					}
				})
			})()
		//#endregion



		// 获取携程全部国家列表
		let IndexCountry = require("./datas/IndexCountry.json")
		app.get('/getIndexCountry', async (request, response) => {
			response.send({
				code: 200,
				msg: 'ok',
				data: IndexCountry
			})
		})

		// 获取携程首页国际•港澳台特价机票
		let IndexInternational = require("./datas/guojigangao/IndexInternational.json")
		let yazhou = require("./datas/guojigangao/yazhou.json")
		let ouzhou = require("./datas/guojigangao/ouzhou.json")
		let meizhou = require("./datas/guojigangao/meizhou.json")
		let feizhou = require("./datas/guojigangao/feizhou.json")
		app.get('/getIndexInternational', async (request, response) => {
			// 拿到gp为键的属性值
			let { gp } = request.query
			if (gp === "YaZhou") {
				response.send({
					code: 200,
					msg: 'ok',
					data: yazhou
				})
				return
			} else if (gp === "OuZhou") {
				response.send({
					code: 200,
					msg: 'ok',
					data: ouzhou
				})
				return
			} else if (gp === "MeiZhou") {
				response.send({
					code: 200,
					msg: 'ok',
					data: meizhou
				})
				return
			} else if (gp === "FeiZhou") {
				response.send({
					code: 200,
					msg: 'ok',
					data: feizhou
				})
				return
			}
			response.send({
				code: 200,
				msg: 'ok',
				data: IndexInternational
			})
		})


		// 获取携程首页境外租车
		let IndexCarRental = require("./datas/IndexCarRental.json")
		app.get('/getIndexCarRental', async (request, response) => {
			response.send({
				code: 200,
				msg: 'ok',
				data: IndexCarRental
			})
		})

		// 热门目的地
		let IndexPlay = require("./datas/IndexPlay.json")
		app.get('/getIndexPlay', async (request, response) => {
			response.send({
				code: 200,
				msg: 'ok',
				data: IndexPlay
			})
		})

		// 全球购
		let GlobalPurchasing = require("./datas/GlobalPurchasing.json")
		app.get('/getGlobalPurchasing', async (request, response) => {
			response.send({
				code: 200,
				msg: 'ok',
				data: GlobalPurchasing
			})
		})

		// 目的地攻略
		let DestinationGuide = require("./datas/DestinationGuide.json")
		app.get('/getDestinationGuide', async (request, response) => {
			response.send({
				code: 200,
				msg: 'ok',
				data: DestinationGuide
			})
		})

		app.listen(2506, (err) => {
			if (!err) console.log('服务器ok了 http://localhost:2506/');
			else console.log(err);
		})

	})()

