<template>
  <div id="login">
    <main-header></main-header>
    <div class="main-cnt">
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
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
              <router-link :to="'signup'" style="text-decoration: none;"><el-button>Sign Up</el-button></router-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      }
      callback()
    }
    return {
      userLoginForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
        ],
        password: [
          { validator: checkPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName, email, password) {
      console.log('checking form')
      var checkForm = false

      this.$refs[formName].validate((valid) => {
        console.log('submitForm call')
        if (valid) {
          console.log('good form')
          checkForm = true
          return true
        } else {
          console.log('error submit!!')
          return false
        }
      })

      if (checkForm === true) {
        console.log('attempting firebase login call')
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (firebaseUser) {
          console.log('success')
          location.reload()
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
            alert('Invalid Email and Password combination')
          } else {
            alert(errorMessage)
          }
          console.log(error)
        })
      } else {
        console.log('false')
      }
    }
  }
}

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
