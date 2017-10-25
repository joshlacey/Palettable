import React from 'react'
import { uploadImage, searchColors } from '../../actions/uploader'
import { connect } from 'react-redux'

class ImageUploader extends React.Component {

  state = {
    url: ""
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({
      url: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if(this.state.url !== "") {
      this.props.searchColors(this.state.url)
    } else {
      alert("Please enter a valid url")
    }

  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input style={{width: '65%', padding: '10px', float: 'left', margin: '5px'}} onChange={this.handleChange} placeholder={'Image Url'}/>
          <button style={{width: '25%', float: 'right'}} className={'nice-button'} type='sumit'>Submit</button>
        </form>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    uploadImage: (img) => {
      dispatch(uploadImage(img))
    },
    searchColors: (url) => {
      dispatch(searchColors(url))
    }
  }
}



export default connect(null, mapDispatchToProps)(ImageUploader)
