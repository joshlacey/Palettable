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

export function addToPalate(svg) {
  return {
    type: "ADD_TO_PALATE",
    payload: svg
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


export function handleNoteChange(event) {
  return {
    type: "NOTE",
    payload: event.target.value
  }
}

function palateUpdated() {
  return {
    type: "UPDATE_TITLE_NOTE"
  }
}

export function editPalate (title, note, id) {
  return function(dispatch) {
    const body = {title: title, note: note }
    const params = {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify(body)
    }
    fetch(process.env.REACT_APP_API_ENDPOINT + 'palates/' + id + '/edit', params)
      .then((res) => res.json())
      .then((json) => {
        if (json){
          dispatch(palateUpdated(json))
        } else {
          alert("didn't work")
        }
      })
  }
}

export function removePalateEls () {
  return {
    type: "REMOVE_PALATE_ELS"
  }
}
