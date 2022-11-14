/*
 * @Descripttion:
 * @Author: @leiwenbin
 * @Date: 2022-10-08 15:41:41
 * @LastEditors: @leiwenbin
 * @LastEditTime: 2022-10-19 09:14:10
 */
/**
* 模块名:
* 代码描述:基础物料接口
* 作者:zhutj
* 创建时间:2022/05/17 11:19:15
*/

interface ICategory {

    /** 分类编码 */
    id: number;

    /** 分类名称 */
    name: string;
}

interface IMaterialData {

    /** 版本 */
    version: string

    /** 物料来源 */
    source: string
}

export interface IMaterial extends IMaterialData {

    /** 物料id */
    id: number;

    /** 物料英文标识 */
    code: string;

    /** 物料名称 */
    name: string;

    /** 物料标题 */
    title: string;

    /** 物料缩略图 */
    thumbnail: string;

    /** 物料类型 */
    type?: string;

    /** 物料分类 */
    category: ICategory;

    /** 物料数据 */
    data?: string[];
}

/** 物料载入接口  */
export interface IMaterialLoader {
    type: string;
    load(material: IMaterial): Promise<any>;
  }