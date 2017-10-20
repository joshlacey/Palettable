import React from 'react';
import { addColors, removeColors, addOneColor } from '../../actions/uploader';
import { connect } from 'react-redux';
import ColorItem from './ColorItem';
import { SliderPicker } from 'react-color';

class ColorsContainer extends React.Component {

state = {
  colorList: [],
  pickerColor: ''
}

loading = () => {
  return(
    <svg width="48" height="48" viewBox="0 0 300 300">
      <path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#ccc">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 150 150" to="360 150 150" begin="0s" dur=".5s" fill="freeze" repeatCount="indefinite"></animateTransform>
      </path>
    </svg>
  )
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
  console.log("hexes", hexes)
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

render () {
  const colors = this.props.colors.length ? this.props.colors.map((c, i) => <ColorItem id={i} key={i} addColor={this.addColor} deleteColor={this.deleteColor}
          style={{width: '200px', height: '30px', backgroundColor: `rgb(${c.color.red},${c.color.green},${c.color.blue})`}}/> ) : null
  return(
      <div>
        {this.props.loading ? this.loading() : colors}
        <SliderPicker color={this.state.pickerColor} onChangeComplete={this.handleSlider}/>
        <button onClick={this.submitColors}>Submit Colors</button>
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
