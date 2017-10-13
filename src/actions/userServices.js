export function loginUser(loginParams) {
  const body = JSON.stringify(loginParams)
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}login`, {
    method: 'post',
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
