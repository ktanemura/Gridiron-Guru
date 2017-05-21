<template>
  <div id="settings">
    <div class="main-cnt">
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-form :model="userLoginForm" ref="userLoginForm" :rules="rules" label-width="100px" class="demo-ruleForm">
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

/* function getParameterByName (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
} */

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
    return {
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
        redirect_uri: 'https://localhost:8010',
        response_type: 'token'
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
        console.log('send request')
        // Construct AJAX query string here
        var clientId = 'dj0yJmk9aUFzRkx2MkVGbnNiJmQ9WVdrOWJXVkVXRWhzTm5NbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD00OA--'
        var redirectUri = 'localhost:8010'
        var responseType = 'token'

        var requestUrl = 'https://api.login.yahoo.com/oauth2/request_auth?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=' + responseType

        console.log(requestUrl)

        axios.get(requestUrl).then(response => {
          // JSON responses are automatically parsed.
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
