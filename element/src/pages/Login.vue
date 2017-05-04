<template>
  <div class="app-fantasylist">
    <div class="col-sm-12 col-md-12">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-blue-dark">
            <h2>Login</h2>
          </div>
        </el-col>
      </el-row>


<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
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

    </div>
  </div>
</template>


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

