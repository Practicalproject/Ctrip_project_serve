/**
 * @description 路由器中间件 - 封装登录/注册路由
 */
const express = require("express");
const { SuccessModal, ErrorModal } = require("../model");
const Router = express.Router;
const { readFile } = require("fs");
const { resolve } = require("path");
const router = new Router();

/**
 * @api {get} /common/countryData 所有城市数据
 * @apiDescription 所有城市数据
 * @apiName countryData
 * @apiGroup common: 公共
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code": 20000,
 *      "success" : true,
 *      "data" : {
 *      },
 *      "message": ""
 *  }
 * @apiSampleRequest http://localhost:5000/common/countryData
 * @apiVersion 1.0.0
 */
router.get("/countryData", async (req, res) => {
  readFile(resolve(__dirname, "./countryData.json"), (err, chunk) => {
    if (err) {
      res.json(new ErrorModal({ message: "数据错误" }));
      return;
    }
    res.json(new SuccessModal({ data: JSON.parse(chunk.toString()) }));
  });
});

module.exports = router;
