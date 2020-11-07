define({ "api": [
  {
    "type": "get",
    "url": "/common/countryData",
    "title": "所有城市数据",
    "description": "<p>所有城市数据</p>",
    "name": "countryData",
    "group": "common:_公共",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 20000,\n    \"success\" : true,\n    \"data\" : {\n    },\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:5000/common/countryData"
      }
    ],
    "version": "1.0.0",
    "filename": "routers/common.js",
    "groupTitle": "common:_公共"
  },
  {
    "type": "post",
    "url": "/login/digits",
    "title": "发送验证码",
    "description": "<p>digits 发送验证码</p>",
    "name": "digits",
    "group": "login:_登录",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:5000/login/digits"
      }
    ],
    "version": "1.0.0",
    "filename": "routers/login.js",
    "groupTitle": "login:_登录"
  },
  {
    "type": "get",
    "url": "/login/oauth/github",
    "title": "github oauth 登录",
    "description": "<p>github oauth 登录</p>",
    "name": "github_oauth",
    "group": "login:_登录",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>授权码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:5000/login/oauth/github"
      }
    ],
    "version": "1.0.0",
    "filename": "routers/login.js",
    "groupTitle": "login:_登录"
  },
  {
    "type": "post",
    "url": "/login/login",
    "title": "手机号登陆",
    "description": "<p>phone 手机号登陆</p>",
    "name": "phone",
    "group": "login:_登录",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:2506/login/login"
      }
    ],
    "version": "1.0.0",
    "filename": "routers/login.js",
    "groupTitle": "login:_登录"
  },
  {
    "type": "post",
    "url": "/login/register",
    "title": "手机号注册",
    "description": "<p>phone 手机号注册</p>",
    "name": "phone",
    "group": "login:_登录",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "Any",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:2506/login/register"
      }
    ],
    "version": "1.0.0",
    "filename": "routers/login.js",
    "groupTitle": "login:_登录"
  },
  {
    "type": "post",
    "url": "/login/verify",
    "title": "验证用户是否登陆",
    "description": "<p>验证用户是否登陆</p>",
    "name": "验证用户是否登陆",
    "group": "login:_登录",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:2506/login/verify"
      }
    ],
    "version": "1.0.0",
    "filename": "routers/login.js",
    "groupTitle": "login:_登录"
  },
  {
    "type": "post",
    "url": "/logout",
    "title": "退出登录",
    "description": "<p>logout 退出登录</p>",
    "name": "退出登录",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>用户唯一标识</p>"
          }
        ]
      }
    },
    "group": "logout:_退出登录",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:5000/logout"
      }
    ],
    "version": "1.0.0",
    "filename": "routers/logout.js",
    "groupTitle": "logout:_退出登录"
  }
] });
