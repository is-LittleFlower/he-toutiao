<template>
  <el-container class="container-home">
    <!-- 侧边栏 -->
    <el-aside class="my-aside" :width="isOpen?'200px':'64px'">
        <!-- 侧边栏logo -->
        <div class="logo" :class="{minLogo: !isOpen}"></div>
        <!--<el-menu 菜单容器 -->
        <!-- default-active="1" 指定那个菜单被激活 使用index属性来标识 -->
        <!-- background-color="#002033" 菜单容器背景颜色 -->
        <!-- text-color="#fff" 菜单容器文本颜色 -->
        <!-- active-text-color="#ffd04b" 菜单容器被激活文本颜色 -->
        <el-menu
           :default-active="$route.path"
           background-color="#002033"
           text-color="#fff"
           active-text-color="#ffd04b"
           style="border-right:none"
           :collapse="!isOpen"
           :collapse-transition="false"
           router
        >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>

        </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部导航区域 -->
      <el-header class="my-header">
        <!-- 设置字体图标 -->
        <span @click="toggleMenu()" class="el-icon-s-fold icon"></span>
        <span class="text">江苏传智播客教育科技有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleClick" class="my-dropdown" >
          <span class="el-dropdown-link">
            <img class="head" :src="photo" alt="">
            <strong class="name">{{name}}</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
              <!-- icon是添加的字体图标 -->
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item> 
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由 欢迎页面显示位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import auth from '@/utils/auth'
import eventBus from '@/eventBus'
export default {
  name: 'app-home',
  data () {
    return {
      isOpen: true,
      name: '',
      photo: ''
    }
  },
  created () {
    const user = auth.getUser()
    this.name = user.name
    this.photo = user.photo
    // 绑定eventBus事件
    eventBus.$on('updateUserName', (name)=> {
      this.name = name
    })
    eventBus.$on('updateUserPhoto', (photo)=>{
      this.photo = photo
    })
  },
  methods: {
    // 切换左菜单
    toggleMenu () {
      //切换状态 展开 收起   宽度/logo/导航菜单组件
      this.isOpen = !this.isOpen
    },
    // 处理下拉菜单的点击
    handleClick (command) {
       if(command === 'setting') {
         this.$router.push('/setting')
       }
       if(command === 'logout') {
         // 退出登录
        // 1. 清除本地用户信息
         auth.delUser()
        // 2. 跳转到登录页面
         this.$router.push('/login')
       }
    }
  }
};
</script>

<style scoped lang="less" >
.container-home {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .my-aside {
    background-color: #002033;
    .logo {
        width: 100%;
        height: 60px;
        background: #002244 url(../../assets/logo_admin.png) no-repeat center / 140px auto;
    }
      // 样式一定需要写在 logo 下方，加上这个类之后去覆盖上面样式
    .minLogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto; 
    }
    .el-menu {
        border-right: none;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      font-size: 16px;
      padding-left: 10px;
    }
    .my-dropdown {
        float: right;
        .head {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
        .name {
           color: #333;
           font-weight: bold;
           vertical-align: middle;
           padding-left: 5px;
        }
    }
  }
}
</style>
