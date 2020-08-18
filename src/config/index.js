/**
  优雅的注册插件
 */

import {
  Button,
  Form,
  FormItem,
  Input,
  Image,
  Checkbox,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Scrollbar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Pagination,
  Tabs,
  TabPane,
} from 'element-ui';

const plugins = {
  Button,
  Form,
  FormItem,
  Input,
  Image,
  Checkbox,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Scrollbar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Pagination,
  Tabs,
  TabPane,
}

for (const key in plugins) {
  if (Object.prototype.hasOwnProperty.call(plugins, key)) {
    console.log(key);
  }
}


