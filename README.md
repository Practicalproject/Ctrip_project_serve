# 启动服务默认http://localhost:5000/
# 登陆接口

## URL:

```http
/login/login
```

## 请求方法:

POST

## 请求参数:

| 字段     | 类型   | 描述   |
| -------- | ------ | ------ |
| phone    | Number | 手机号 |
| password | Number | 密码   |

# 注册接口

## URL:

```http
/login/register
```

## 请求方法:

POST

## 请求参数:

| 字段     | 类型   | 描述   |
| -------- | ------ | ------ |
| phone    | Number | 手机号 |
| password | Any    | 密码   |
| code     | Number | 验证码 |

# 验证用户是否登陆

## URL:

```http
/login/verify
```

## 请求方法

POST

## 请求参数:

```
无
```

# 发送验证码接口

## URL:

```http
/login/digits
```

## 请求方法

POST

## 请求参数:

| 字段  | 类型   | 描述   |
| ----- | ------ | ------ |
| phone | Number | 手机号 |

