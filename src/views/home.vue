<template>
  <!-- container窗口布局组件 -->
  <el-container class="container">
    <el-header class="header">
      <div>
        <img src="../assets/images/logo.png" alt="">
        <span>电商后台管理系统</span></div>
      <el-button type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <div class="toggle-menu" @click="toggleMenu">|||</div>
        <!-- unique-opened 是否只保持一个子菜单的展开 -->
        <!--collapse-transition 将动画效果去掉 -->
        <!-- router 开启路由模式，相当加了一个a链接-->
        <!-- default-active 当前激活的菜单index(也就是路径) 高亮 -->
        <el-menu unique-opened :collapse="iscollapse" router :default-active="active" :collapse-transition="false"
          background-color="#0f6dc5" text-color="#fff" active-text-color="#ffd04b">
          <!-- 一级菜单 -->
          <el-submenu :index="val.name" v-for="val in menuList" :key="val.name">
            <template slot="title">
              <!-- 图标 -->
              <i :class="val.icon" class="icon"></i>
              <span>{{val.name}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item-group v-for="value in val.list" :key="value.name">

              <el-menu-item :index="value.href" @click="getPath(value.href)"> <i class="el-icon-menu"></i>{{value.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  //node中的语法，引入json文件，直接转化成json对象
  let menu = require('../menu.json')
  export default {
    data() {
      return {
        menuList: menu,
        iscollapse: false,
        //默认高亮的选项
        active: "users"
      }
    },
    methods: {
      loginout() {
        window.sessionStorage.clear()
        this.$router.push("/login")
      },
      toggleMenu() {
        this.iscollapse = !this.iscollapse
      },
      getPath(path) {
        window.sessionStorage.setItem("menuUrl", path)
        this.active = path
      }
    }
  }

</script>
<style lang="less">
  .container {
    height: 100%;
  }

  .header {
    background: #ffffff;
    display: flex;
    //header头尾元素对齐
    justify-content: space-between;
    font-size: 20px;
    //去掉elment的内边距   ,
    padding-left: 0;
    //让按钮上下有空隙
    align-items: center;

    >div>img {
      height: 50px
    }

    >div {
      display: flex;
      //div里面的元素垂直居中
      align-items: center
    }
  }

  .toggle-menu {
    //鼠标放上去有小手
    cursor: pointer;
    letter-spacing: 0.2em;
    text-align: center;
    background: #0f6dc5;
    color: #ffffff;
  }

  .aside {
    background: #0f6dc5;
  }

  .main {
    background: #ebeef2;
  }

  .icon {
    margin-right: 10px;
  }

  //去掉边框对不齐的情况
  .el-menu {
    border: 0
  }

</style>
