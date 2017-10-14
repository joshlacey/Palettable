export function loginUser(loginParams) {
  const body = JSON.stringify(loginParams)
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}login`, {
    method: 'POST',
    body: body,
    headers: {
      "Accept":"application/json",
      "Content-Type":"application/json"
    }
  })
    .then((res) => res.json())

}


export function logoutUser() {
  localStorage.removeItem("jwtToken")
}

export function createUser(signupParams) {
  console.log(signupParams)
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}signup`, {
    method: 'POST',
    body: JSON.stringify(signupParams),
    headers: {
      "Accept":"application/json",
      "Content-Type":"application/json"
    }
  })
    .then((res) => res.json())
}
