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
<el-form :model="signUpForm" :rules="rules2" ref="signUpForm" label-width="150px" class="demo-signUpForm">
  <el-form-item label="Name" prop="name">
    <el-input v-model="signUpForm.name" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item label="Email" prop="email">
    <el-input type="email" v-model="signUpForm.email" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item label="Username" prop="username">
    <el-input v-model="signUpForm.username" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item label="Password" prop="password">
    <el-input type="password" v-model="signUpForm.password" auto-complete="off" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item label="Confirm" prop="confirmPassword">
    <el-input type="password" v-model="signUpForm.confirmPassword" auto-complete="off" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('signUpForm', signUpForm.username, signUpForm.email, signUpForm.password)">Sign Up</el-button>
    <router-link :to="'login'" style="text-decoration: none;"><el-button>Back</el-button></router-link>
  </el-form-item>
</el-form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
// import {Firebase} from '../main.js'

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.signUpForm.confirmPassword !== '') {
          this.$refs.signUpForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.signUpForm.password) {
        callback(new Error('Two inputs don\'t match!'))
      } else {
        callback()
      }
    }
    return {
      signUpForm: {
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      rules2: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    createRestOfProfile (username) {
      console.log('in createRestOfProfile method!')
      var user = firebase.auth().currentUser
      user.updateProfile({
        displayName: 'Jane Q. User'
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
        var errorcode = error.code
        var errormessage = error.message
        if (errorcode === 'auth/account-exists-with-different-credential') {
          alert('email already associated with another account.')
        } else {
          alert(errormessage)
        }
        console.log(error)
      })
    },

    submitForm (formName, username, email, password) {
      console.log('creating new user...')
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function (firebaseUser) {
        window.history.go(-1)
        console.log('success')
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorcode = error.code
        var errormessage = error.message
        if (errorcode === 'auth/account-exists-with-different-credential') {
          alert('email already associated with another account.')
        } else {
          alert(errormessage)
        }
        console.log(error)
      })
      var user = firebase.auth().currentUser
      user.displayName = 'Jane Q. User'
      console.log('before createRestOfProfile method')
      this.createRestOfProfile(username)
      // this.$router.push('/login')
    }
  }
}
</script>
