# 启动服务默认http://localhost:8080/
# 登陆接口

## URL:

/login

## 请求方法:

POST

## 请求参数:

{

​	email:2506377990@qq.com,

​	pwd:123456,

}

# 注册接口

## URL:

/register

## 请求方法:

POST

## 请求参数:

{

​	email:2506377990@qq.com,

​	pwd:123456,

​	nick_name:小艾

}

# 验证是否登陆

## URL:

/verify_login

## 请求方法

POST

## 请求参数:

{

​	_id:登陆后才会有_id

}

# 获取携程首页第一板块热门列表

## URL
/getIndexHot
## 请求方式
GET

## 请求参数

无

# 获取携程全部国家列表

## URL
/getIndexCountry
## 请求方式
GET

## 请求参数

无

# 获取携程首页海外酒店板块数据

## URL
/getIndexHotel
## 请求方式
GET

## 请求参数

无

# 获取携程首页国际•港澳台特价机票

## URL
/getIndexInternational
## 请求方式
GET

## 请求参数

gp:
    YaZhou
    OuZhou
    MeiZhou
    FeiZhou
    

# 获取携程首页境外租车

## URL
/getIndexCarRental
## 请求方式
GET

## 请求参数

无

# 获取携程首页热门目的地

## URL
/getIndexPlay
## 请求方式
GET

## 请求参数

无

# 获取携程首页全球购

## URL

/getGlobalPurchasing

## 请求方式

GET

## 请求参数

无

# 获取携程首页目的地攻略

## URL

/getDestinationGuide

## 请求方式

GET

## 请求参数

无