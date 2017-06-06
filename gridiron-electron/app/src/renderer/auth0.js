import auth0 from 'auth0-js'

export default class AuthService {

  constructor () {
    this.login = this.login.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: 'gridiron.auth0.com',
    clientID: '-fLD5qYHU7sylCat_liQRsAOT_tTG_qt',
    redirectUri: 'http://localhost:9080/callback',
    audience: 'https://gridiron.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  })

  login () {
    this.auth0.authorize({
      connection: 'yahoo'
    })
  }

}
