const mongoose = require("mongoose");

const users = new mongoose.Schema({
  // 手机号
  phone: {
    type: String,
    unique: true,
    //required: true,
  },
  // 软删除
  deleted: {
    type: Boolean,
    default: false,
  },
  // 创建时间
  gmtCreate: {
    type: Date,
    default: Date.now(),
  },
  // 修改时间
  gmtModified: {
    type: Date,
    default: Date.now(),
  },
  // 用户名
  username: {
    type: String,
    // unique: true,
    default: "atguigutest",
  },
  // 密码
  password: {
    type: String,
  },
  // 昵称
  nickName: {
    type: String,
    default: "谷粉",
  },
  // 头像
  avatar: {
    type: String,
    default:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  },
  token: {
    type: String,
  },
});

users.pre("save", function (next) {
  const date = new Date().toLocaleString();
  if (this.isNew) {
    this.gmtCreate = date;
  }
  this.gmtModified = date;
  next();
});

module.exports = mongoose.model("users", users);
