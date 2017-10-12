function savedPalete(svg) {
  return {
    type: "PALETE_SAVED",
    payload: svg
  }
}

function savingPalete() {
  return {
    type: "SAVING_PALETE"
  }
}

export function savePalete(userId, palete) {
  return function (dispatch) {
    dispatch(savingPalete())
    const body = {user_id: userId,
            data: {svg: palete }
          }
    const params = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)

    }

    fetch(process.env.REACT_APP_API_ENDPOINT + 'users/' + userId + '/paletes', params)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        if (json){
          dispatch(savedPalete(json))
        } else {
          alert("didn't work")
        }
      })
  }
}
