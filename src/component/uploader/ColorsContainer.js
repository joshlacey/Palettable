import React from 'react';
import { addColors, removeColors } from '../../actions/uploader';
import { connect } from 'react-redux';
import ColorItem from './ColorItem';
import { ChromePicker } from 'react-color';
import { loading } from '../../helpers/loader.js'

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
    var hex = c.toString(16); //converts number into its hex value
    return hex.length == 1 ? "0" + hex : hex;
}

rgbToHex(array) {
    let hexValues = array.map(number => this.componentToHex(parseInt(number, 10)))
    return "#" + hexValues.join('');
}

submitColors = () => {
  const colors = this.state.colorList.map(c => c.color)
  //if there is a color selected in the color picker add that to the colors.
  this.state.pickerColor !== '' ? colors.push(this.state.pickerColor) : null
  //filter unique colors
  const uniqueColors = [...new Set(colors)]
  //convert to hex values
  const hexes = uniqueColors.map(c => {
          //color is saved as rgb(255,255,255)
          const arr = c.replace(/[rgb()]/g, "").split(",")
          return this.rgbToHex(arr)
      })
    this.props.addColors(hexes)
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

loadingColors () {
  return (
    <div style={{margin: '30% auto'}}>{loading()}</div>
  )
}

render () {
  const colors = this.props.colors.length ? this.props.colors.map((c, i) => <ColorItem id={i} key={i} addColor={this.addColor} deleteColor={this.deleteColor}
          style={{width: '100%', height: '30px', backgroundColor: `rgb(${c.color.red},${c.color.green},${c.color.blue})`}}/> ) : null
  const wrapperStyle = (this.props.colors.length || this.props.loading) ? {display: 'grid', gridTemplateColumns: '2fr 3fr', marginBottom: '5px', gridGap: '5px'} : {}
  return(
      <div>
        <div style={wrapperStyle}>
          <div style={{gridColumn: '1/2', overflowY: 'scroll'}}>
            {this.props.loading ? loading() : colors}
          </div>
          <ChromePicker disableAlpha={true} color={this.state.pickerColor} onChangeComplete={this.handleSlider}/>
        </div>
        <button style={{width: '100%', marginTop: '15px'}} className={'nice-button'} onClick={this.submitColors}>Submit Colors</button>
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
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ColorsContainer)
