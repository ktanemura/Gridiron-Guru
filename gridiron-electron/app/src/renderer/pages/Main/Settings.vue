<template>
  <div id="settings">
    <div class="main-cnt">
    <!--div class="col-sm-12 col-md-12"-->
      <!--el-row :gutter="20"-->
      <el-row>
        <!--el-col :span="12" :offset="6"-->
        <el-col :span="24">
          <el-form :model="updateSettingsForm" ref="updateSettingsForm" :rules="rules" label-width="150px" class="demo-ruleForm">
            <p style="font-weight:bold;">Update Gridiron Account Settings</p>
            <el-form-item label="Gridiron Username" prop="gridironUsername" style="width: 50%;">
              <el-input v-model="updateSettingsForm.gridironUsername"></el-input> 
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUsername('updateSettingsForm', updateSettingsForm.gridironUsername)">Update Username</el-button>
            </el-form-item>
            <el-form-item label="Email" prop="userEmail">
              <el-input type="email" v-model="updateSettingsForm.userEmail" style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserEmail('updateSettingsForm', updateSettingsForm.userEmail)">Update Email</el-button>
            </el-form-item>
          </el-form>

          <el-form :model="updatePasswordForm" ref="updatePasswordForm" :rules="rules" label-width="150px" class="demo-ruleForm">
            </br><p style="font-weight:bold;">Change Gridiron Password</p>
            <el-form-item>
              <el-button type="primary" @click="updatePassword()">Change Password</el-button>
            </el-form-item>
          </el-form>

          <el-form :model="userLoginForm" ref="userLoginForm" :rules="rules" label-width="150px" class="demo-ruleForm">
            </br><p style="font-weight:bold;">Link a Yahoo Account</p>
            <el-form-item
              label="Yahoo Email"
              prop="email">
                <el-input type="email" v-model="userLoginForm.email" auto-complete="off" style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item
              label="Password"
              prop="password">
                <el-input type="password" v-model="userLoginForm.password" auto-complete="off" style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('userLoginForm', userLoginForm.email, userLoginForm.password)">Link Account</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import { firebaseDb } from '../../main.js'
// import {Firebase} from '../../main.js'

export default {
  data () {
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      }
      callback()
    }
    var checkYahooEmail = (rule, value, callback) => {
      if (!value.includes('@')) {
        callback(new Error('Please enter yahoo email'))
      }
      callback()
    }
    var user = firebase.auth().currentUser
    return {
      updatePasswordForm: {
      },
      updateSettingsForm: {
        gridironUsername: user.displayName,
        userEmail: user.email
      },
      userLoginForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: 'blur' },
          { validator: checkYahooEmail, trigger: 'blur' }

        ],
        password: [
          { validator: checkPass, trigger: 'blur' }
        ]
      },
      authRequest: {
        url: 'https://api.login.yahoo.com/oauth2/request_auth?',
        client_id: 'dj0yJmk9UUdja0lOdmo0dlhXJmQ9WVdrOWJIRjBVRFJSTjJzbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD05Mw--',
        redirect_uri: 'https://localhost:9080',
        response_type: 'token'
      }
    }
  },
  methods: {
    updatePassword () {
      var auth = firebase.auth()
      var emailAddress = firebase.auth().currentUser.email
      auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        console.log('email sent')
      }, function (error) {
        // An error happened.
        var errorcode = error.code
        var errormessage = error.message
        if (errorcode === 'auth/account-exists-with-different-credential') {
          alert('email already associated with another account.')
        } else {
          alert(errormessage)
        }
        console.log('email NOT sent')
      })

      console.log('in updatePassword method')
    },
    updateUsername (formname, newUsername) {
      var user = firebase.auth().currentUser
      user.updateProfile({
        displayName: newUsername
      }).then(function () {
        var userRefs = firebaseDb.ref().child('users')
        var pushRef = userRefs.push()
        pushRef.set({email: user.email, username: user.displayName})
        console.log('upated your username to ' + user.displayName)
      }, function (error) {
        var errorcode = error.code
        var errormessage = error.message
        if (errorcode === 'auth/account-exists-with-different-credential') {
          alert('email already associated with another account.')
        } else {
          alert(errormessage)
        }
      })
    },
    updateUserEmail (formname, newEmail) {
      var user = firebase.auth().currentUser

      user.updateEmail(newEmail).then(function () {
        // Update successful.
        console.log('updated your email to ' + user.email)
      }, function (error) {
        // An error happened.
        var errorcode = error.code
        var errormessage = error.message
        if (errorcode === 'auth/account-exists-with-different-credential') {
          alert('email already associated with another account.')
        } else {
          alert(errormessage)
        }
      })
    },
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
        console.log('send request')
        // Construct AJAX query string here
        var clientId = 'dj0yJmk9aUFzRkx2MkVGbnNiJmQ9WVdrOWJXVkVXRWhzTm5NbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD00OA--'
        var redirectUri = 'localhost:9080'
        var responseType = 'token'
        var requestUrl = 'https://api.login.yahoo.com/oauth2/request_auth?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=' + responseType

        console.log(requestUrl)
        axios.get(requestUrl).then(response => {
          // JSON responses are automatically parsed.
          if (response.status === 302) {
            console.log('Got')
          } else {
            console.log('Nope')
            console.log(response.status)
          }
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
      } else {
        console.log('false')
      }
    }
  }
}
</script>
