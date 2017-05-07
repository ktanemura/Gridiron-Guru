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


<el-form :model="userLoginForm" ref="userLoginForm" :rules="rules" label-width="100px" class="demo-ruleForm">
  <el-form-item
    label="Email"
    prop="email">
    <el-input type="email" v-model="userLoginForm.email" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item
    label="Password"
    prop="password">
    <el-input type="password" v-model="userLoginForm.password" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('userLoginForm', userLoginForm.email, userLoginForm.password)">Login</el-button>
    <el-button>Sign Up</el-button>
  </el-form-item>
</el-form>

    </div>
  </div>
</template>


<script>

  export default {
    data() {
      var checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        }

        callback();
      };

      return {
        userLoginForm: {
          email: '',
          password: ''
        },

        rules: {
          email: [
            { required: true, message: 'Please input email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: 'blur,change' }
          ],
          password: [
            { validator: checkPass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName, email, password) {
        this.$refs[formName].validate((valid) => {
          console.log('called');
          if (valid) {
            console.log('Valid');
            console.log(email);
            console.log(password);
            //Need to add firebase import
            return firebaseapp.auth.signInWithEmailAndPassword(email, password);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

