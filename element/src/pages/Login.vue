<template>
  <div id="login">
    <main-header></main-header>
    <div class="main-cnt">
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-form :model="loginForm" ref="loginForm" label-width="100px" class="">
            <el-form-item
              label="Username"
              prop="username">
              <el-input type="age" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="Password"
              prop="password">
              <el-input type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('numberValidateForm')">Login</el-button>
              <el-button>Sign Up</el-button>
              <!--el-button @click="resetForm('numberValidateForm')">Reset</el-button-->
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      });
    },
  },
};
</script>

<style>
html, 
body {
    height: 100%;
}

body {
  margin: 0 0;
  font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
}

h1 {
  font-weight: 400;
}

h2 {
  font-size: 28px;
  font-weight: 400;
  color: #1f2f3d;
  margin: 0;
}

h3 {
  font-size: 22px;
  font-weight: 400;
  color: #1f2f3d;
  margin: 45px 0 15px;
}

a {
  text-decoration: none;
}

p {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.5em;
}

#app {
  margin-left: 30px;
  margin-right: 30px;
}

.el-row {
  margin-top: 10px;
  margin-bottom: 14px;
}
.el-row-breadcrumbs {
  margin-top: 6px;
}

.el-card {
  box-shadow: none;
}
</style>


<script>
  export default {
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

