/*
 * @Descripttion:编辑器路由
 * @Author: @leiwenbin
 * @Date: 2022-09-19 14:39:15
 * @LastEditors: sunjun
 * @LastEditTime: 2022-10-26 07:55:18
 */
import { createRouter, createWebHashHistory } from "vue-router";
import Main from "../views/Main.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
    }
  ],
});

export default router;
