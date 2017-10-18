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

export function savePalate(userId, palate, copy) {
  return function (dispatch) {
    dispatch(savingPalate())
    console.log(copy)
    const body = {user_id: userId,
            palate_data: {color: '234 123 123', svg: palate, copy: copy }
          }
    const params = {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body)

    }

    fetch(process.env.REACT_APP_API_ENDPOINT + 'users/' + userId + '/palates', params)
      .then((res) => res.json())
      .then((json) => {
        if (json){
          dispatch(savedPalate(json))
        } else {
          alert("didn't work")
        }
      })
  }
}

export function updatePalate(currentPalate) {
  return {
    type: "UPDATE_PALATE",
    payload: currentPalate
  }
}

export function addToPalate(svg) {
  return {
    type: "ADD_TO_PALATE",
    payload: svg
  }
}

export function removeCurrentColor() {
  return{
    type: "REMOVE_CURRENT_COLOR"
  }
}
