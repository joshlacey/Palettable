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

export function savePalate(userId, copy, title, note, colors) {
  return function (dispatch) {
    dispatch(savingPalate())
    const body = {user_id: userId,
            palate_data: { copy: copy, title: title, note: note, colors: colors.join(',') }
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

export function screenShot() {
  return {
    type: "SCREENSHOT"
  }
}

export function resetPalate ( array ) {
  return {
    type: "RESET_PALATE",
    payload: array
  }
}

export function removeNextColors () {
  return {
    type: "REMOVE_NEXTCOLORS"
  }
}

export function removeOneColor (color) {
  return {
    type: "REMOVE_ONE_COLOR",
    payload: color
  }
}

export function handleTitleChange(event) {
  return {
    type: "TITLE",
    payload: event.target.value
  }
}


export function handleNoteChange (event) {
  return {
    type: "NOTE",
    payload: event.target.value
  }
}
