
function loggingIn () {
  return {
    type: 'LOGGING_IN'
  }
}

function loggedIn (user) {
  return {
    type: 'LOGGED_IN',
    payload: user
  }
}

function setLocalStorage(resp) {
  localStorage.setItem("jwtToken", resp.jwt)
  localStorage.setItem("userId", resp.user.id)
  localStorage.setItem("username", resp.user.username)
}

export function loginUser(loginParams) {
  return function (dispatch) {
  dispatch(loggingIn())
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
      dispatch(loggedIn(user))
    })
  }
}

export function logoutUser() {
  localStorage.removeItem("jwtToken")
  localStorage.removeItem("userId")
  localStorage.removeItem("username")
  return{type: 'LOGGING_OUT'}
}

function create (user) {
  return {type: 'LOGGING_IN', payload: user}
}

export function createUser(signupParams) {
  return function (dispatch) {
  console.log(signupParams)
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
        dispatch(create(user))
      } else {
        alert(user.message)
      }
    })
  }
}
