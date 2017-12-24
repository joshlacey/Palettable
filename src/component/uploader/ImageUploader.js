import React from 'react'
import { uploadImage, searchColors } from '../../actions/uploader'
import { connect } from 'react-redux'
import '../../index.css'

class ImageUploader extends React.Component {

  state = {
    url: "",
    valid_url: true
  }

  handleChange = (event) => {
    event.preventDefault()
    let string = event.target.value
    if (/\.(?:jpe?g|png|gif|bmp|raw|ico|webp)/.test(string) || !string.length){
      this.setState({
        url: event.target.value,
        valid_url: true
      })
    } else {
      this.setState({
        valid_url: false
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if(this.state.url !== "" && this.state.valid_url) {
      this.props.searchColors(this.state.url)
    } else {
      alert("Please enter a valid url")
    }
  }

  render() {
    let errorMessage = this.state.valid_url ? '' : '* Invalid Url Please Try Again'
    return (
      <div className={'image-form'}>
        <form onSubmit={this.handleSubmit}>
          <input maxLength='500' onChange={this.handleChange} placeholder={'Image Url'}/>
          <button className={'nice-button'} type='submit'>Sample ></button>
        </form>
        <div><p style={{color: 'red', fontSize: '.5em'}}>{errorMessage}</p></div>
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
