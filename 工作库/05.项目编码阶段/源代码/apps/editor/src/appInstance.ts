/**
* 模块名:应用实例
* 代码描述:
* 作者:zhutj
* 创建时间:2022/05/24 09:37:06
*/
import { createApp } from 'vue';
import * as Vue from 'vue'
import App from './App.vue';
(window as any).Vue = Vue
const app = createApp(App);
export default app;