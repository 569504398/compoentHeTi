<template>
  <!-- login-containe是当前组件的$el -->
  <div id="login-container">
    <div class="login-box">
      <!-- login-form 是login-conataine的子组件，是这个子组件的$el -->
      <el-form
        :model="loginform"
        class="login-form"
        label-width="0px"
        :rules="rules"
        ref="formData"
      >
        <el-form-item prop="user" >
          <el-input v-model="loginform.user" prefix-icon="iconfont iconpassword" placeholder="用户名/手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password"  >
          <el-input v-model="loginform.password" prefix-icon="el-icon-user-solid" placeholder="密码" ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login" >登录</el-button>
          <el-button type="info" @click="resetLoginform">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginform: {
        user: "",
        password: ""
      },
      rules: {
        //user属性需要与v-model属性保持一致
        user: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetLoginform() {
      this.$refs.formData.resetFields();
    },
    login() {
      this.$refs.formData.validate(async valid => {
        if (!valid) return;
        //async与  await用来处理promise
        //利用解析将获取的属性值分离出来
        let { data: res } = await this.$http.post("login", this.loginform);
        if (res.status !== 200) return this.$message.error(res.msg);
        this.$message.success(res.msg);
        window.sessionStorage.setItem("accessToken", res.token);
        this.$router.push("./home");
      });
    },
    //监听enter键
  }
};
</script>
<style   scoped>
#login-container {
  width: 100%;
  height: 100%;
  background: #759cb1;
  position: absolute;
}
.login-box {
  width: 450px;
  height: 300px;
  background: #b9ccd5;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.login-form {
  position: absolute;
  bottom: 0;
  padding: 0px 40px;
  width: 100%;
  box-sizing: border-box;
}
</style>