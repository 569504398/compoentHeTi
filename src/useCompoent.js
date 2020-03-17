import Vue from 'vue' 

import {
    Container,
    Checkbox,
    CheckboxGroup,
    Header,
    Dialog,
    Button,
    Select,
    Table,
    Aside,
    Main,
    Input,
    Row,
    Col,
    TableColumn,
    DropdownItem,
    DropdownMenu,
    Dropdown,
    Option,
    Form,
    FormItem,
    Message,
    MessageBox,
    Menu,
    Loading,
    Pagination,
    Tabs,
    TabPane,
    Radio,
    Upload,
    DatePicker,
    RadioGroup,
    RadioButton,
    Cascader,
    Steps,
    Step,
    Transfer,
    InputNumber,
    Tooltip,
    Tree,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb ,
    BreadcrumbItem,
    Card,
    Switch,
  } from 'element-ui'
  Vue.use(Container)
  Vue.use(Checkbox)
  Vue.use(CheckboxGroup)
  Vue.use(Header)
  Vue.use(Dialog)
  Vue.use(Button)
  Vue.use(Select)
  Vue.use(Table)
  Vue.use(Aside)
  Vue.use(Main)
  Vue.use(Menu)
  Vue.use(Input)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(TableColumn)
  Vue.use(DropdownItem)
  Vue.use(DropdownMenu)
  Vue.use(Dropdown)
  Vue.use(Option)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Pagination)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Radio)
  Vue.use(Upload)
  Vue.use(DatePicker)
  Vue.use(RadioGroup)
  Vue.use(RadioButton)
  Vue.use(Cascader)
  Vue.use(Steps)
  Vue.use(Step)
  Vue.use(Transfer)
  Vue.use(InputNumber)
  Vue.use(Tooltip)
  Vue.use(Tree)
  Vue.use(Submenu)
  Vue.use(MenuItemGroup)
  Vue.use(MenuItem)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  Vue.use(Card)
  Vue.use(Switch)

  //消息提示全局使用
// window.$message = Message 
Vue.prototype.$message =Message 
Vue.prototype.$confirm = MessageBox.confirm