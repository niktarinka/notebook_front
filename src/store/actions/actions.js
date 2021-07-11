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