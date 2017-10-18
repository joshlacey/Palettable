import React from 'react';
import Snap from 'snapsvg-cjs';
import { connect } from 'react-redux'
import SVGElement from './SVGElement'
import { savePalate, updatePalate, addToPalate, removeCurrentColor } from '../../actions/palate'

class SVGContainer extends React.Component {

  state = {
    editMode: false
  }

componentDidMount = () => {
  var s = Snap('#mainContainer')
  s.attr({ viewBox: "0 0 400 400" })
  this.setState({
    mounted: true
  })
}


toArray (obj) {
  var array = [];
  for (var i = obj.length >>> 0; i--;) {
    array[i] = obj[i].outerHTML;
  }
  return array;
}

saveSVG = () => {
  const palate = document.getElementById('mainContainer').cloneNode(true)
  const palateCopy = document.getElementById('mainContainer').cloneNode(true)
  const children = this.toArray(palateCopy.childNodes)
  children.shift()
  children.shift()
  console.log(children)
  palate.id += "1"

  const xmlSerializer = new XMLSerializer;

  const svgString = xmlSerializer.serializeToString(palate);


  const id = localStorage.getItem('userId') ? localStorage.getItem('userId') : null
  id ? this.props.savePalate(id, svgString, children) : alert("you must be logged in to save.")

  //document.body.appendChild(palate)
}

editMode = () => {
  this.setState({
    editMode: !this.state.editMode
  })
}

  render () {
    //if there is a color added to the store element = <SVGElement withcolor/> dispatch()
    console.log("thecurrentcolor", this.props.currentColor)
    if (this.props.currentColor) {this.props.addToPalate(<SVGElement fill={this.props.currentColor}/>); this.props.removeCurrentColor() }
    console.log(this.props.palateEls)
    const elements = this.props.colors ? this.props.colors.map((c,i) => <SVGElement key={i} id={"svg" + i} fill={c}/>) : null
    return (
      <div id='#palateContainer'>
        <svg width={'400px'} height={'400px'} id={'mainContainer'} >
          {elements}
        </svg>
        <button onClick={this.editMode}>Edit Palate</button>
        <button onClick={this.saveSVG}>Save</button>
      </div>
    )
  }
}

function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--;) {
    array[i] = obj[i].outerHTML;
  }
  return array;
}

function mapStateToProps(state) {
  return {
    colors: state.uploader.colorContainer,
    currentColor: state.uploader.color,
    element: state.palate.current,
    palateEls: state.palate.otherPalate
  }
}

function mapDispatchToProps(dispatch) {
  return {
    savePalate: (userId, svg, copyString) => {
      dispatch(savePalate(userId, svg, copyString))
    },
    updatePalate: (currentPalate) => {
      dispatch(updatePalate(currentPalate))
    },
    addToPalate: (svg) => {
      dispatch(addToPalate(svg))
    },
    removeCurrentColor: () => {
      dispatch(removeCurrentColor())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SVGContainer)
