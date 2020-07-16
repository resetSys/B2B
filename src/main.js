import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from "vue-quill-editor";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
  
Vue.use(VueQuillEditor);
Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });
// import {
//   Button,
//   Form,
//   FormItem,
//   Input,
//   Image,
//   Checkbox,
//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,
//   Container,
//   Header,
//   Aside,
//   Main,
//   Footer,
//   Scrollbar,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Avatar,
//   Pagination,
//   Tabs,
//   TabPane,
//   } from 'element-ui';

// Vue.use(Tabs);
// Vue.use(TabPane);
// Vue.use(Pagination);
// Vue.use(Avatar);
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
// Vue.use(Scrollbar);
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
// Vue.use(Footer);
// Vue.use(Button);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Input);
// Vue.use(Image);
// Vue.use(Checkbox);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
