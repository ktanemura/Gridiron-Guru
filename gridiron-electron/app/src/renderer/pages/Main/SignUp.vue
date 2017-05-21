<template>
  <div class="app-fantasylist">
    <div class="col-sm-12 col-md-12">
      <el-row>
        <el-col :span="24">
       <p align=right>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-button type="primary" icon="setting"></el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Settings</el-dropdown-item>
            <el-dropdown-item>Account Management</el-dropdown-item>
            <el-dropdown-item>Draft Advisor</el-dropdown-item>
            <el-dropdown-item>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
       </p>
          <div class="grid-content bg-blue-dark">
            <h2>Sign Up</h2>
          </div>
        </el-col>
      </el-row>
<el-form :model="signUpForm" :rules="rules" ref="signUpForm" label-width="150px" class="demo-signUpForm">
  <el-form-item label="Name" prop="name">
    <el-input v-model="signUpForm.name" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item label="Email" prop="email">
    <el-input type="email" v-model="signUpForm.email" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item label="Gridiron Username" prop="username">
    <el-input v-model="signUpForm.username" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item label="Gridiron Password" prop="password">
    <el-input type="password" v-model="signUpForm.password" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('signUpForm', signUpForm.email, signUpForm.password)">Sign Up</el-button>
    <el-button @click="resetForm('signUpForm')">Reset</el-button>
  </el-form-item>
</el-form>
<router-link :to="'login'" style="text-decoration: none;"><el-button>Back</el-button></router-link>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase'
  export default {
    data () {
      return {
        signUpForm: {
          name: '',
          email: '',
          username: '',
          password: ''
        },
        rules: {
          name: [
            { required: true, message: 'Please input your name', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Please input your email', trigger: 'blur' }
          ],
          username: [
            { required: true, message: 'Please input your new Gridiron username', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please input your new password', trigger: 'blur' }
          ]
        }

/*        dynamicValidateForm: {
          domains: [{
            key: 1,
            value: ''
          }],
          yahooEmail: ''
        }
*/

      }
    },
    methods: {
      submitForm (formName, email, password) {
        console.log('creating new user...')

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (firebaseUser) {
          console.log('success')
          // this.$router.push('login')
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('Email already associated with another account.')
          } else {
            alert(errorMessage)
          }
          console.log(error)
        })

        /* this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        }); */
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
