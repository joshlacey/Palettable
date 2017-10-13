function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwtToken')
  }
}

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
            palate_data: {color: '234 123 123', svg: palate }
          }
    console.log('header that is being sent', headers())
    const params = {
      method: 'POST',
      headers: headers(),
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
