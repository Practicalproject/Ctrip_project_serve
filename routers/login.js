/**
 * @description 路由器中间件 - 封装登录/注册路由
 */
const express = require("express");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const Users = require("../db/models/users");
const { SuccessModal, ErrorModal } = require("../model");
// const md5 = require("../utils/md5");
const { sign, verify } = require("../utils/jwt");
const { CLIENT_ID, CLIENT_SECRET } = require("../config");
const { filterPassword } = require("../utils/tools");
const session_user = require("../session");
const { nanoid } = require('nanoid')
const Router = express.Router;
const router = new Router();

const md5 = require("md5")
//验证码过期时间
const PHONE_EXPIRES = 60 * 1000;
//cookie过期时间(7天免登录)
const COOKIE_MAX_AGE = 7 * 24 * 3600 * 1000;

/**
 * @api {post} /login/digits 发送验证码
 * @apiDescription digits 发送验证码
 * @apiName digits
 * @apiGroup login: 登录
 * @apiParam {Number} phone 手机号
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/login/digits
 * @apiVersion 1.0.0
 */
router.post("/digits", async (req, res) => {
  const { phone } = req.body;
  const verify_code = getVerifyCode(6);
  let user = await Users.findOne({ phone });
  if (user) {
    res.json(new ErrorModal({ message: "用户已注册" }));
  } else {
    console.log('验证码为：' + verify_code);
    session_user[phone] = {
      code: verify_code,
      expires: Date.now() + PHONE_EXPIRES,
    };
    res.json(new SuccessModal({}));
  }

});
function getVerifyCode(len = 6) {
  let verify_code = "";
  for (let i = 0; i < len; i++) {
    verify_code += Math.floor(Math.random() * 10);
  }
  return verify_code;
}


/**
 * @api {post} /login/login 手机号登陆
 * @apiDescription phone 手机号登陆
 * @apiName phone
 * @apiGroup login: 登录
 * @apiParam {Number} phone 手机号
 * @apiParam {Number} password 密码
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/login/login
 * @apiVersion 1.0.0
 */
router.post('/login', async (request, response) => {
  //获取客户端传递过来的：邮箱、密码、昵称
  const { phone, password } = request.body
  //去数据库中查询该用户是否注册过
  let user = await Users.findOne({
    phone,
    password: md5(password)
  });
  let token
  //若登录成功
  console.log(user)
  if (user) {
    // request.session._id = findResult._id
    token = user.token;
    response.cookie("user_session", token, {
      maxAge: COOKIE_MAX_AGE
    });
    response.json(new SuccessModal({
      message: "登录成功！"
    }));

  } else {
    //登录失败
    response.send({
      code: 20001,
      msg: '登录失败！',
      data: {}
    })
  }
})

/**
 * @api {post} /login/register 手机号注册
 * @apiDescription phone 手机号注册
 * @apiName phone
 * @apiGroup login: 登录
 * @apiParam {Number} phone 手机号
 * @apiParam {Any} password 密码
 * @apiParam {Number} code 验证码
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/login/register
 * @apiVersion 1.0.0
 */
router.post("/register", async (req, res) => {
  const { phone, code, password } = req.body;
  const codeData = session_user[phone];
  if (password) {
    if (codeData.expires > Date.now() && codeData.code == code) {
      let user = await Users.findOne({ phone, password: md5(password) });
      let token;

      if (user) {
        // try {
        //   token = user.token;
        //   //登录成功
        //   if (!token) {
        //     //下发签名
        //     token = await sign({ phone });
        //     //存入数据库
        //     user.token = token;
        //     await user.save();
        //   } else {
        //     await verify(token);
        //   }
        // } catch {
        //   const token = await sign({ phone });
        //   //存入数据库中
        //   user.token = token;
        //   await user.save();
        // }
        //去数据库中查询该用户是否注册过
        res.json(new ErrorModal({ message: "用户已注册" }));

      } else {

        token = await sign({ phone });
        // 存在数据库中
        user = await Users.create({
          phone,
          password: md5(password),
          token,
        });
        res.json(new ErrorModal({ message: "注册成功" }));

      }
    } else {
      res.json(new ErrorModal({ message: "验证码无效" }));
    }
  } else {
    res.json(new ErrorModal({ message: "密码为空,请输入密码" }));
  }

});

/**
 * @api {get} /login/oauth/github github oauth 登录
 * @apiDescription github oauth 登录
 * @apiName github oauth
 * @apiGroup login: 登录
 * @apiParam {Number} code 授权码
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/login/oauth/github
 * @apiVersion 1.0.0
 */
router.get("/oauth/github", async (req, res) => {
  try {
    //获取到了授权码code
    const { code } = req.query;
    console.log('github返回的code为：', code);
    //接着去请求令牌token
    const tokenResponse = await axios({
      method: "post",
      url: `https://github.com/login/oauth/access_token`,
      data: {
        client_id: CLIENT_ID, //github授权-网站标识
        client_secret: CLIENT_SECRET, //github授权-机密码
        code, //上一步返回的code
      },
      headers: {
        accept: "application/json",
      },
    });
    // 得到github授权查询token
    const accessToken = tokenResponse.data.access_token;
    console.log('github返回的授权token为：', accessToken);
    // 携带token向github请求用户数据
    const { data } = await axios({
      method: "get",
      url: "https://api.github.com/user",
      headers: {
        accept: "application/json",
        Authorization: `token ${accessToken}`,
      },
    });
    console.log('github返回的用户信息：', data);
    //去数据库中查询是否存在该用户
    const user = await Users.findOne({ username: data.login });
    //准备一个token
    let token;
    //如果没有该用户
    if (!user) {
      //注册该用户，同时生成一个token
      token = await sign({ username: data.login });
      //向数据库中写入数据
      await Users.create({
        username: data.login,
        avatar: data.avatar_url,
        nickName: data.name,
        password: data.node_id,
        token: token,
        phone: 'github-' + nanoid(),
      });
    } else {
      //如果有该用户
      try {
        //取出之前存的token
        token = user.token;
        //校验token，看是否过期
        await verify(user.token);
      } catch {
        //若过期，重新生成token
        token = await sign({ username: data.id });
        //更改之前存储的token
        user.token = token;
        //保存数据
        await user.save();
      }
    }
    res.cookie("user_session", token, { maxAge: COOKIE_MAX_AGE });
    //将得到的用户数据返回到页面上~
    res.redirect(`http://vuexiaoai.utools.club/#/usercenter`);
  } catch (e) {
    console.log(e);
  }
});

/**
 * @api {post} /login/verify 验证用户是否登陆
 * @apiDescription 验证用户是否登陆
 * @apiName 验证用户是否登陆
 * @apiGroup login: 登录
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/login/verify
 * @apiVersion 1.0.0
 */
router.post("/verify", cookieParser(), async (req, res) => {
  try {
    const { user_session } = req.cookies;
    const data = await verify(user_session);
    const user = await Users.findOne(data);
    res.json(new SuccessModal({ data: filterPassword(user) }));
  } catch (e) {
    console.log(e);
    res.json(new ErrorModal({ message: "用户未登录，请先登录" }));
  }
});

module.exports = router;
