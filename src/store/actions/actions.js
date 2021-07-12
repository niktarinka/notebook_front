export function setUserToken(token) {
  return {
    type: 'SET_USER_TOKEN',
    token: token,
  }
}

export function setUserAuth(authentication) {
  return {
    type: 'SET_USER_AUTH',
    authentication: authentication,
  }
}

export function setUserData(data) {
  return {
    type: 'SET_USER_DATA',
    data: data,
  }
}

export function exitUser() {
  return {
    type: 'EXIT_USER',
  }
}