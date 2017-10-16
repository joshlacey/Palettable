import React from 'react';
import Snap from 'snapsvg-cjs';
import { connect } from 'react-redux'
import SVGElement from './SVGElement'
import { savePalate } from '../../actions/palate'

class SVGContainer extends React.Component {

  state = {
    mounted: false,
    editMode: false
  }

componentDidMount = () => {
  var s = Snap('#mainContainer')
  s.attr({ viewBox: "0 0 400 400" })
  this.setState({
    mounted: true
  })
}

saveSVG = () => {
  const palate = document.getElementById('mainContainer').cloneNode(true)
  palate.id += "1"
  const xmlSerializer = new XMLSerializer;
  const svgString = xmlSerializer.serializeToString(palate);
  const id = localStorage.getItem('userId') ? localStorage.getItem('userId') : null
  id ? this.props.savePalate(id, svgString) : alert("you must be logged in to save.")
  //document.body.appendChild(palate)
}

editMode = () => {
  this.setState({
    editMode: !this.state.editMode
  })
}

// editOptions = (svg) => {
//   console.log("hello from the other side")
//   const editBox = document.getElementById('editOptions')
//   const button = document.createElement('button')
//   button.innerHTML = '+'
//   button.addEventListener('click', () => svg.attr({width: "+=5"}))
//   editBox.appendChild(button)
// }

  render () {
    const overlayStyle={zIndex: '2', width: '100%', height: '100%'}
    const elements = this.props.colors ? this.props.colors.map((c,i) => <SVGElement key={i} id={"svg" + i} fill={c}/>) : null
    return (
      <div id='#palateContainer'>
        {this.state.editMode ? <div id={'editOptions'} style={overlayStyle}>{this.editOptions}</div> : null}
        <svg width={'400px'} height={'400px'} id={'mainContainer'} >
          {this.state.mounted ? elements : null}
        </svg>
        {this.state.editMode ? <div style={overlayStyle}></div> : null}
        <button onClick={this.editMode}>Edit Palate</button>
        <button onClick={this.saveSVG}>Save</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    colors: state.uploader.colorContainer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    savePalate: (userId, svg) => {
      dispatch(savePalate(userId, svg))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SVGContainer)
