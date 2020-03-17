<template>
  <div id="user">
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card卡片组件 -->
    <el-card class="box-card">
      <!-- layout布局=分栏 组件 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- input输入框 组件-->
          <el-input placeholder="请输入内容" class="input-with-select" v-model="userInfo.user"
            @keyup.native.enter="handleEnter">
            <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="user" label="名字"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="tel" label="手机"></el-table-column>
        <el-table-column prop="status" label="状态">
          <!-- 插槽能访问子组件的数据 -->
          <template v-slot:default="slotProps">
            <el-switch v-model="slotProps.row.status" @change="getStatus(slotProps.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="tableData" label="操作" width="200">
          <template v-slot:default="slotProps">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="getEditDialog(slotProps.row)" ></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUserInfo(slotProps.row.id)"></el-button>
            <el-tooltip class="item" effect="dark" content="设置权限" placement="top-start" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
             </template>
        </el-table-column>
      </el-table>
      <!--page-size 页码数的默认从上选择一个 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="userInfo.currentPage" :page-sizes="[2, 4, 10, 100]" :page-size="2"
        layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>

    <!-- 对话框 -->
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="50%" @close="closeDialog">
      <!-- label-width：调整的是label的label的宽度 -->
      <el-form :model="addform" class="login-form" label-width="60px" :rules="addFormRules" ref="formData">
        <el-form-item prop="user" label="用户">
          <el-input v-model="addform.user"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="addform.password"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="addform.email"></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="手机">
          <el-input v-model="addform.tel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog 
  title="修改用户"
  :visible.sync="editDialogVisible" 
  width="50%">
   <el-form :model="editData" class="login-form" label-width="60px" :rules="editFormRules" ref="editFormData">
        <el-form-item  label="用户">
          <el-input v-model="editData.user" disabled=""></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="editData.email"></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="手机">
          <el-input v-model="editData.tel"></el-input>
        </el-form-item>
      </el-form>
  <span slot="footer" class="dialog-footer"> 
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      var checkEamil = (reg, value, callback) => {
        const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (regEmail.test(value)) {
          return callback();
        }
        callback(new Error("请输入合法的邮箱"));
      };
      var checkTel = (reg, value, callback) => {
        const regTel =
          /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
        if (regTel.test(value)) {
          return callback();
        }
        callback(new Error("请输入合法的手机号"));
      };
      return {
        tableData: [],
        userInfo: {
          user: "",
          perCount: 2,
          currentPage: 1
        },
        userList: [],
        pageSize: 1,
        total: 0,
        dialogVisible: false,
        editDialogVisible:false,
        editData:{
           id:"",
           user:"",
           tel:"",
           email:"",
        },
        addform: {
          user: "",
          tel: " ",
          password: "",
          email: ""
        },

        addFormRules: {
          //user属性需要与v-model属性保持一致
          user: [{
              required: true,
              message: "请输入用户密码",
              trigger: "blur"
            },
            {
              min: 2,
              max: 10,
              message: "长度在 2 到 10个字符",
              trigger: "blur"
            }
          ],
          email: [{
              required: true,
              message: "请输入用户邮箱",
              trigger: "blur"
            },
            {
              validator: checkEamil,
              trigger: "blur"
            }
          ],
          password: [{
              required: true,
              message: "请输入用户密码",
              trigger: "blur"
            },
            {
              min: 5,
              max: 15,
              message: "长度在 5到 15个字符",
              trigger: "blur"
            }
          ],
          tel: [{
              required: true,
              message: "请输入用户手机",
              trigger: "blur"
            },
            {
              validator: checkTel,
              trigger: "blur"
            }
          ]
        },
        editFormRules:{
          email: [{
              required: true,
              message: "请输入用户邮箱",
              trigger: "blur"
            },
            {
              validator: checkEamil,
              trigger: "blur"
            }
          ],
          tel: [{
              required: true,
              message: "请输入用户手机",
              trigger: "blur"
            },
            {
              validator: checkTel,
              trigger: "blur"
            }
          ]
        }
      };
    },
    created() {
      this.getUserList();
    },
    methods: {
      async getUserList() {
        const {
          data: res
        } = await this.$http.get("users", {
          params: this.userInfo
        });
        if (res.status !== 200) return this.$message.error("获取失败");
        this.userList = res.arr;
        this.pageSize = res.pages;
        this.total = res.count;
      },

      // 键盘事件 enter
      handleEnter() {
        this.getUserList();
      },
      searchName() {
        this.getUserList();
      },
      //当改变每页显示的数量时触发
      handleSizeChange(val) {
        this.userInfo.perCount = val;
        this.getUserList();
      },

      //当切换页码时触发
      handleCurrentChange(val) {
        //  console.log(typeof val);
        this.userInfo.currentPage = val;
        this.getUserList();
      },
      //对话框关闭时触发 ,用户清除表单数据，防止打开时还有数据
      closeDialog() {
        this.$refs.formData.resetFields()
      },
      //添加用户操作
       addUser() {
        //获取表单组件并进行整个表单进行校验
        this.$refs.formData.validate(async valid=>{
            if(!valid) return 
           const  {data:res} = await this.$http.post("users",this.addform)
            if(res.status!==201)  return  this.$message.error("添加用户失败")
              this.$message.success("添加用户成功")
                this.dialogVisible = false 
                this.getUserList()
        })
      },

      //编辑用户操作
      editUser(){
          this.$refs.editFormData.validate( async valid=>{
            if(!valid) return 
           const  {data:res} = await this.$http.put("users/"+this.editData.id,{email:this.editData.email,tel:this.editData.tel})
            if(res.status!==200)  return  this.$message.error("修改用户信息失败")
              this.$message.success("修改用户信息成功")
                this.editDialogVisible = false 
                this.getUserList()
        })
      },
      //获取修改的用户信息
      getEditDialog(data){
          // 这里也可以通过id到服务器请求数据
           this.editData = data
          this.editDialogVisible = true
      },
     //删除用户信息
   async  delUserInfo(id){
       const info =await  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err);
         if(info!=="confirm")  return
        const  {data:res} = await this.$http.delete("users/"+id)
          if(res.status!==200)  return   this.$message.error("删除用户信息失败")
          this.$message.success("删除用户信息成功")
           this.getUserList()
     },

      async getStatus(userInfo) {
        const {
          data: res
        } = await this.$http.put(
          `users/${userInfo.id}/state/${userInfo.status}`
        );
        if (res.status !== 200) {
          userInfo.status = !userInfo.status;
          return this.$message.error("更新用户失败");
        }
        this.$message.success("更新状态成功");
      }
    }
  };

</script>
<style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 20px;
  }

  .el-card {
    box-shadow: 0px 1px 1px rgba(100, 100, 100, 0.2);
  }

  .el-table {
    margin-bottom: 20px;
  }

</style>
