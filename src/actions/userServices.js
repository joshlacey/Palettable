

function setLocalStorage(resp) {
  localStorage.setItem("jwtToken", resp.jwt)
  localStorage.setItem("userId", resp.user.id)
  localStorage.setItem("username", resp.user.username)
}

export function loginUser(loginParams) {
  return function (dispatch) {
  const body = JSON.stringify(loginParams)
  fetch(`${process.env.REACT_APP_API_ENDPOINT}login`, {
    method: 'POST',
    body: body,
    headers: {
      "Accept":"application/json",
      "Content-Type":"application/json"
    }
  })
    .then((res) => res.json())
    .then((user) => {
      user.jwt !== undefined ? setLocalStorage(user) : null
    })
  }
}

export function logoutUser() {
  localStorage.removeItem("jwtToken")
  localStorage.removeItem("userId")
  localStorage.removeItem("username")
  return{type: 'LOGGING_OUT'}
}

export function createUser(signupParams) {
  return function (dispatch) {
  fetch(`${process.env.REACT_APP_API_ENDPOINT}signup`, {
    method: 'POST',
    body: JSON.stringify(signupParams),
    headers: {
      "Accept":"application/json",
      "Content-Type":"application/json"
    }
  })
    .then((res) => res.json())
    .then((user) => {
      if (user.jwt !== undefined){
        setLocalStorage(user)
      } else {
        alert(user.message)
      }
    })
  }
}
