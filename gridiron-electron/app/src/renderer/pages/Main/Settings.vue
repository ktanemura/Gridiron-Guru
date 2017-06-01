<template>
  <div id="settings">
    <div class="main-cnt">
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-form :model="updateSettingsForm" ref="updateSettingsForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <p style="font-weight:bold;">Update Gridiron Account Settings</p>
            <el-form-item label="Gridiron Username" prop="gridironUsername">
              <el-input v-model="updateSettingsForm.gridironUsername"></el-input> 
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="logNewUsername('updateSettingsForm', updateSettingsForm.gridironUsername)">Log New Username</el-button>
            </el-form-item>
            <el-form-item label="Email" prop="userEmail">
              <el-input type="email" v-model="updateSettingsForm.userEmail"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateSettings('updateSettingsForm', updateSettingsForm.gridironUsername, updateSettingsForm.userEmail)">Save</el-button>
            </el-form-item>
          </el-form>

          <el-form :model="updatePasswordForm" ref="updatePasswordForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            </br><p style="font-weight:bold;">Change Gridiron Password</p>
            <el-form-item>
              <el-button type="primary" @click="updatePassword('updatePasswordForm')">Change Password</el-button>
            </el-form-item>
          </el-form>

          <el-form :model="userLoginForm" ref="userLoginForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            </br><p style="font-weight:bold;">Link a Yahoo Account</p>
            <el-form-item
              label="Yahoo Email"
              prop="email">
                <el-input type="email" v-model="userLoginForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="Password"
              prop="password">
                <el-input type="password" v-model="userLoginForm.password" auto-complete="off"></el-input>
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
import {Firebase} from '../../main.js'
/* function getParameterByName (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
} */
// var user

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
    var nameFromDB = Firebase.auth().currentUser.displayName
    console.log('name from db: ' + nameFromDB)
    return {
      updatePasswordForm: {
      },
      updateSettingsForm: {
        gridironUsername: Firebase.auth().currentUser.displayName,
        userEmail: ''
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
    setUp () {
      console.log('IN SETUP()')
      var user = Firebase.auth().currentUser
      this.updateSettingsForm.gridironUsername = user.displayName
      console.log('USER DISPLAY NAME' + user.displayName)
    },

    logNewUsername (formName, newGridironUsername) {
/*      console.log('1. new gridiron username: ' + newGridironUsername)
      var user = Firebase.auth().currentUser
      this.updateSettingsForm.gridironUsername = user.displayName
      console.log('2. new gridiron username: ' + this.updateSettingsForm.gridironUsername)
*/
/*      this.updateSettingsForm.gridironUsername = 'cheese'
      console.log('this.updateSettingsForm.gridironUsername: ' + this.updateSettingsForm.gridironUsername)
*/
    },
    updateSettings (formName, newUsername, newEmail) {
      var user = Firebase.auth().currentUser
      console.log(user.uid)
      user.updateProfile({
        gridironUsername: newUsername
      })
    },

    updatePassword () {
      console.log('in updatePassword method')
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
    },
    mounted () {
      this.setUp()
    }
  }
}
</script>
