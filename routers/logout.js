const express = require("express");
const Router = express.Router;
const router = new Router();
const { SuccessModal } = require("../model");

/**
 * @api {post} /logout 退出登录
 * @apiDescription logout 退出登录
 * @apiName 退出登录
 * @apiParam {String} _id 用户唯一标识
 * @apiGroup logout: 退出登录
 * @apiSuccess {Object} data
 * @apiSampleRequest http://localhost:5000/logout
 * @apiVersion 1.0.0
 */
router.post("/logout",(req,res)=>{
	res.clearCookie('user_session')
	res.send(new SuccessModal({data:'登出成功'}))
})

module.exports = router;
