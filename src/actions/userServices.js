function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwtToken')
  }
}

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
      if(user.message) {
        alert(user.message)
        return null
      } else {
        user.jwt !== undefined ? setLocalStorage(user) : null
        dispatch(loggedIn(user))
      }
    })
  }
}

function loggedIn(user) {
  return {
    type: "LOGGED_IN",
    payload: user
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
        dispatch(loggedIn(user))
      } else {
        alert(user.message)
      }
    })
  }
}



function loadingPalates () {
  return {
    type: 'LOADING'
  }
}


export function deletePalate(id) {
  return function (dispatch) {
    dispatch(loadingPalates())
    const userId = localStorage.getItem('userId')
    const params = {
      method: 'DELETE',
      body: JSON.stringify({id: id, userId: userId}),
      headers: headers()
    }
    fetch(`${process.env.REACT_APP_API_ENDPOINT}palates/` + id + '/delete', params)
    .then(res => res.json())
    .then(res => dispatch(updateMyPalates(res)))
  }
}

function updateMyPalates(palates) {
  return {
    type: "UPDATE_MY_PALATES",
    payload: palates
  }
}

export function getMyPalates() {
  return function (dispatch) {
    dispatch(loadingPalates())
    const params = {
      method: 'GET',
      headers: headers()
    }
    const userId = localStorage.getItem('userId')
    fetch(process.env.REACT_APP_API_ENDPOINT +'users/' + userId + '/palates', params)
      .then(resp => resp.json())
      .then(resp => {
        dispatch(updateMyPalates(resp))
      })
  }
}
