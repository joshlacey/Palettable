import React from 'react'
import { uploadImage, searchColors } from '../actions/image'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
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
    //this.props.uploadImage(this.state.url)
    this.props.searchColors(this.state.url)
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} placeholder={'Image Url'}/>
          <button type='sumit'>Submit</button>
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
