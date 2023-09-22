import Cookies from 'vue-cookies'

const TokenKey = 'skyee_siteverify_token'
const PasswordKey = 'skyee_siteverify_password'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, '1d')
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getPasswod() {
  return Cookies.get(PasswordKey)
}

export function setPassword(pwd) {
  return Cookies.set(PasswordKey, pwd, '1d')
}

export function removePasswod() {
  return Cookies.remove(PasswordKey)
}
