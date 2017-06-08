<template>
  <div class="createusername">
  <main-header></main-header>
    <div class="col-sm-12 col-md-12">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-blue-dark">
            <h2>Create Your Username</h2>
          </div>
        </el-col>
      </el-row>
<el-form :model="createUsernameForm" :rules="rules2" ref="createUsernameForm" label-width="150px" class="demo-createUsernameForm">
  <el-form-item label="Username" prop="username">
    <el-input v-model="createUsernameForm.username" style="width: 50%;"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitUsername('createUsernameForm', createUsernameForm.username)">Create Username</el-button>
    <!--router-link :to="'signup'" style="text-decoration: none;"><el-button>Back</el-button></router-link-->
  </el-form-item>
</el-form>
    </div>
  </div>
</template>

<script>
import { firebase, firebaseDb } from '../main.js'
// import {Firebase} from '../main.js'

export default {
  data () {
    return {
      createUsernameForm: {
        username: ''
      },
      rules2: {
      }
    }
  },
  methods: {
    submitUsername (formName, username) {
      var user = firebase.auth().currentUser
      user.updateProfile({
        displayName: username
      }).then(function () {
        var userRefs = firebaseDb.ref().child('users')
        var updates = {}
        updates['/' + user.uid] = {email: user.email, username: user.displayName}
        userRefs.update(updates)
        console.log('set username to: ' + user.displayName)
        console.log('key should be: ' + user.uid)
        window.history.go(-2)
      }, function (error) {
        var errorcode = error.code
        var errormessage = error.message
        if (errorcode === 'auth/account-exists-with-different-credential') {
          alert('email already associated with another account.')
        } else {
          alert(errormessage)
        }
      })
      console.log('create username...')
    }
  }
}
</script>
