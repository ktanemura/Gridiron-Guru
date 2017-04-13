<template>
  <div class="login-box">
    <div class="login-logo">
      <a v-link="{ path: '/' }"><b>Admin</b> LTE</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Sign in with your yahoo fantasy football account</p>
      <form v-on:submit.prevent="login()">
        <div v-if="!success && messages != ''">
          <div class="alert alert-danger"> 
            <a href="#" class="close" data-dismiss="alert">&times;</a>
            {{ messages }}
          </div>
        </div>

        <div v-if="success && messages != ''">
          <div class="alert alert-success"> 
            <a href="#" class="close" data-dismiss="alert">&times;</a>
            {{ messages }}
          </div>
        </div>

        <div class="form-group has-feedback">
          <input type="email" class="form-control" placeholder="Email" v-model="email">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>

        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Password" v-model="password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>

        <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
              <!--label>
                <div class="icheckbox_square-blue" aria-checked="false" aria-disabled="false" style="position: relative;"><input type="checkbox" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins></div> Remember Me
              </label--!>
            </div>
          </div>
          <!-- /.col -->
          <!--div class="col-xs-4"--!>
          <div class="signIn-box">
            <div class="signIn"><button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button><d/div>
          </div>
          <div>
            <div class="registerButton"--!><a class="registerStyle" href="https://football.fantasysports.yahoo.com">Register</a></div>
          </div>
          <!-- /.col -->
        </div>
        
      </form>
    </div> 
  </div>   
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      messages: '',
      success: false,
      body_class: 'hold-transition login-page',
    };
  },
  methods: {
    login() {
      this.$parent.$data.login = false;
      this.$parent.$data.body_class = 'sidebar-mini skin-blue-light';
    },
  },
};
</script>

<style>
.signIn-box {
   margin-left: -5px;
   margin-right: 100px;
   width: 360px;
   height: 40px;
   box-sizing: border-box;
}
.signIn {
   margin-top: 10px;
   marin-bottom: 10px;
   margin-left: 260px;
   width: 80px;
   height: 20px;
   box-sizing: border-box;
 
}
.registerButton {
   width: 85px;
   height: 35px;
   box-sizing: border-box;
   margin-top: -10px;
   margin-left: 20px;
}
.registerStyle {
   color: white;
   width: 85px;
   height: 35px;
   color: #2f8ec6;
   font-weight: bold;
}
</style>
