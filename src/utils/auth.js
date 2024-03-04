import Cookies from 'vue-cookies'

const TokenKey = 'skyee_business_h5'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, '1d')
}

export function removeToken() {
  Cookies.remove(TokenKey)
}
