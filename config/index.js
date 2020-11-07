/*
  服务器和数据库的配置
 */
const isDev = process.env.NODE_ENV === "development";

// mongodb的配置
const MONGO_CONFIG = {
  port: 27017,
  host: "localhost",
  database: "ctrip_project",
};
// 服务器配置
let SERVER_CONFIG = {
  port: 80,
  host: "0.0.0.0",
};

if (isDev) {
  SERVER_CONFIG = {
    port: 5000,
    host: "localhost",
  };
}

//github授权-网站标识
const CLIENT_ID = "e14ef098fc8b5d42542e";
//github授权-网站机密码
const CLIENT_SECRET = "9b0f4f81e62a091b1a27b777df4b620ea135f2c9";
//密码加盐
const SECRET = "A0d2afW6Ysa";

module.exports = {
  MONGO_CONFIG,
  SERVER_CONFIG,
  SECRET,
  CLIENT_ID,
  CLIENT_SECRET,
};
