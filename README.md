# 启动服务默认http://localhost:2506/
# 登陆接口

## URL:

/login

## 请求方法:

POST

## 请求参数:

```
{
    email:2506377990@qq.com,
    pwd:123456,
}
```



# 注册接口

## URL:

/register

## 请求方法:

POST

## 请求参数:

```
{
    email:2506377990@qq.com,
    pwd:123456,
    nick_name:小艾
}
```



# 验证是否登陆

## URL:

/verify_login

## 请求方法

POST

## 请求参数:

```
{
	_id:登陆后才会有_id
}
```

# 获取携程首页第一板块 热门 列表

## URL
/getIndexHot
## 请求方式
GET

## 请求参数


    diqu:
        JingNei
        RiBen
        DongNanYa
        OuZhou
        MeiZhou
        AoZhongDongFei

# 获取携程首页第一板块 周边游 列表

## URL
/getIndexSurrounding
## 请求方式
GET

## 请求参数


    diqu:
        JingXuan
        ShangHai
        HangZhou
        SuZhou
        HuangShan
        NanJing
        ZhouShan
        NingBo
        AnJi
        WuXi

# 获取携程首页第一板块 门票 列表

## URL
/getIndexTickets
## 请求方式
GET

## 请求参数


    diqu:
        ShangHai
        LongYou
        ZuoYang
        GaoYou
        SheYang
        YangZhou
        HeXian
        HaiAn

# 获取携程首页第一板块 出境游 列表

## URL
/getIndexOverseas
## 请求方式
GET

## 请求参数


    diqu:
        JingXuan
        RiBen
        ZhongGuoAoMen
        TaiGuo
        MaErDaiFu
        BingDao
        RuiShi
        XinJiaPo
        DongJing
        PuJiDao


# 获取携程首页第二板块 海外酒店 列表

## URL
/getIndexHotel
## 请求方式
GET

## 请求参数


    dq:
        ReMenChengShi
        DuShiGouWu
        HaiDaoXiuXian
        LuYouShengDi

# 获取携程首页第二板块 海外民宿+短租 列表

## URL
/getIndexRentals
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

```
无
```




# 获取携程首页第三板块 国际•港澳台特价机票 板块数据

## URL
/getIndexInternational
## 请求方式
GET

## 请求参数

```
gp:
    YaZhou
    OuZhou
    MeiZhou
    FeiZhou
```

不传参默认为热门往返

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