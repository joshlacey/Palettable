const baseUrl = process.env.REACT_APP_API_ENDPOINT

export default class AuthAdapter {
  static login (loginParams) {
    return fetch(`${baseUrl}auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static currentUser () {
    return fetch(`${baseUrl}current_user`, {
      headers: headers()
    }).then(res => res.json())
  }
}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}
