//引入项目中的全局组件
import SvgIcon from "@/components/svgIcon.vue";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ZModal from "@/components/zModal.vue";

//全局对象
const allGlobalComponents = { SvgIcon, ZModal };

//对外暴露插件对象
export default {
  install(app: any) {
    //注册项目的全部组件
    for (const [key, component] of Object.entries(allGlobalComponents)) {
      //注册为全局组件
      app.component(key, component);
    }

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component as any);
    }
  },
};
