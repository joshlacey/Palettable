export function uploadImage(url) {
  return {
    type: "UPLOAD_IMG",
    payload: url
  }
}


function fetchingColors() {
  return {
    type: "FETCHING_COLORS"
  }
}

function fetchedColors(colors) {
  return {
    type: "FETCHED_COLORS",
    payload: colors
  }
}

export function searchColors(url) {
  return function (dispatch) {
    dispatch(fetchingColors())

    const body = {
            "requests":[
              {
                "image":{
                  "source":{
                    "imageUri":
                      `${url}`
                  }
                },
                "features":[
                  {
                    "type":"IMAGE_PROPERTIES",
                    "maxResults":1
                  }
                ]
              }
            ]
          }

    const params = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      cache: 'no-cache',
      body: JSON.stringify(body)

    }

    fetch('https://vision.googleapis.com/v1/images:annotate?key='+ process.env.REACT_APP_CLOUDVISION_KEY, params)
      .then((res) => res.json())
      .then((json) => {
        if (json.responses[0].imagePropertiesAnnotation){
          dispatch(fetchedColors(json.responses[0].imagePropertiesAnnotation.dominantColors.colors))
        } else {
          alert(json.responses[0].error.message)
        }
      })
  }
}

export function addColors(array) {
  return{
    type: "ADD_COLORS",
    payload: array
  }
}
