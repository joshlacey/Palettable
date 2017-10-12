function savedPalate(svg) {
  return {
    type: "PALATE_SAVED",
    payload: svg
  }
}

function savingPalate() {
  return {
    type: "SAVING_PALATE"
  }
}

export function savePalate(userId, palate) {
  return function (dispatch) {
    dispatch(savingPalate())
    const body = {user_id: userId,
            data: {svg: palate }
          }
    const params = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)

    }

    fetch(process.env.REACT_APP_API_ENDPOINT + 'users/' + userId + '/palates', params)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        if (json){
          dispatch(savedPalate(json))
        } else {
          alert("didn't work")
        }
      })
  }
}
