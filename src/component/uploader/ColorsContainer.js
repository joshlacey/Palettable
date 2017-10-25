import React from 'react';
import { addColors, removeColors, addOneColor } from '../../actions/uploader';
import { connect } from 'react-redux';
import ColorItem from './ColorItem';
import { ChromePicker } from 'react-color';
import { loading } from '../../snap/loader.js'

class ColorsContainer extends React.Component {

state = {
  colorList: [],
  pickerColor: ''
}

addColor = (colorObj) => {
  this.setState({
    colorList: [...this.state.colorList, colorObj ]
  })
}

deleteColor = (id) => {
  this.setState({
    colorList: this.state.colorList.filter(color => color.id !== id )
  })
}

componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
}

submitColors = () => {
  const temp = this.state.colorList.map(c => c.color)
  this.state.pickerColor !== '' ? temp.push(this.state.pickerColor) : null
  const unique = [...new Set(temp)]
  const hexes = unique.map(c => {
          const arr = c.replace("(", ",").replace(")", ",").split(",")
          return this.rgbToHex(parseInt(arr[1], 10),parseInt(arr[2], 10),parseInt(arr[3], 10))
      })
  if (unique.length === 1) {
    this.props.addOneColor(hexes[0])
  } else {
    this.props.addColors(hexes)
  }
}

handleSlider = (color) => {
  const c = color.rgb
  const string = `rgb(${c.r},${c.g},${c.b})`
  this.setState({pickerColor: string})
}

componentWillUnmount() {
  this.props.removeColors()
}

componentDidMount () {
  document.querySelector('.chrome-picker').style = "background: rgb(255, 255, 255); border: 1px solid #ccc; border-radius: 2px; box-sizing: initial; width: 100%; font-family: Menlo;"
}

render () {
  const colors = this.props.colors.length ? this.props.colors.map((c, i) => <ColorItem id={i} key={i} addColor={this.addColor} deleteColor={this.deleteColor}
          style={{width: '100%', height: '30px', backgroundColor: `rgb(${c.color.red},${c.color.green},${c.color.blue})`}}/> ) : null
  const wrapperStyle = this.props.colors.length ? {display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: '5px'} : {}
  return(
      <div>
        <div style={wrapperStyle}>
          <div style={{gridColumn: '1/2', overflowY: 'scroll'}}>
            {this.props.loading ? loading() : colors}
          </div>
          <ChromePicker disableAlpha={true} color={this.state.pickerColor} onChangeComplete={this.handleSlider}/>
        </div>
        <button style={{width: '100%'}} className={'nice-button'} onClick={this.submitColors}>Submit Colors</button>
      </div>
  )
}

}

function mapStateToProps(state) {
  return {
    colors: state.uploader.fetchedColors,
    loading: state.uploader.fetchingColors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addColors: (colorArray) => {
      dispatch(addColors(colorArray))
    },
    removeColors: () => {
      dispatch(removeColors())
    },
    addOneColor: (color) => {
      dispatch(addOneColor(color))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ColorsContainer)
