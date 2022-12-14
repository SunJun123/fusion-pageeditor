import app from "./appInstance";
import router from "./router";
import "./assets/font/iconfont.css";
import "./assets/font/iconfont.js";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import '@/locales'
import { GlobalRegistry } from "fusion-core";

GlobalRegistry.registerDesignerLocales()
app.use(ElementPlus, {
    locale: zhCn,
});
app.use(router);

app.mount("#app");
