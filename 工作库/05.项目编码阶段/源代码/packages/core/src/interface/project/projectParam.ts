/*
 * @Descripttion:参数接口定义
 * @Author: @leiwenbin
 * @Date: 2022-10-11 10:19:52
 * @LastEditors: @leiwenbin
 * @LastEditTime: 2022-10-18 16:08:29
 */
export interface ITreeNodeMethodParam{
  key:string,
  label:string,
  type:string,//参数类型，input输入类型;select类型，则需定义option
  value:any,//默认值
  options?:any[],//当type为select时存在
}
export interface IGlobalParam {
    key: string,//参数标识
    label: string,//参数名称
    type: string,//参数类型
    value: any,//参数值
  }

  export type IGlobalParamType = Record<string, IGlobalParam>;
  export type GlobalParamObj = Record<string, IGlobalParamType>;
