/*
 * @Descripttion:事件相关枚举
 * @Author: @leiwenbin
 * @Date: 2022-10-09 10:00:22
 * @LastEditors: @leiwenbin
 * @LastEditTime: 2022-10-19 10:32:08
 */
/**
 * 事件类型
 */
 export enum EventTypeEnum {
    Relation = 1,//关联事件
    Route = 2,//路由事件
    Calculation = 3,//计算脚本
    Custom = 4,//自定义脚本
    DataSource = 5,//数据源
    BuiltIn = 6,//内置方法
}

/**
 * 内置方法
 */
  export enum BuiltInEnum {
    signOut=1,//退出登录
    modifyGlobalParam=2,//修改全局参数
    reload=3,//刷新页面
    returnLast=4,//返回上一页
    exe3D=5,//3D执行方法
  }
