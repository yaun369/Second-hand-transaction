import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RolesKey = 'Admin-Roles'
const StateKey = 'Admin-State'
//token or cookie
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
//roles
export function getRoles() {
  return Cookies.get(RolesKey)
}

export function setRoles(Roles) {
  return Cookies.set(RolesKey, Roles)
}

//State
export function getState() {
  return Cookies.get(StateKey)
}

export function setState(State) {
  return Cookies.set(StateKey, State)
}
export function removeToken() {
  Cookies.remove(RolesKey)
  Cookies.remove(StateKey)
  return Cookies.remove(TokenKey)
}
