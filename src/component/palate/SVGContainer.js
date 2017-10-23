import React from 'react';
import Snap from 'snapsvg-cjs';
import Parser from 'html-react-parser'
import { connect } from 'react-redux'
import SVGElement from './SVGElement'
import * as actions from '../../actions/palate'

class SVGContainer extends React.Component {

  state = {
    reorderMode: false,
    deleteMode: false,
    save: false,
    currentHoverData: ""
  }

// componentDidMount = () => {
//   var test = Snap('#mainContainer')
//   test.attr({ viewBox: "0 0 400 400" })
// }

componentWillUpdate(nextProps, nextState) {
  //console.log(this.palate)
  if (nextState.save) {
    this.takeScreenShot()
    this.setState({save:false})
  }
  if (nextProps.currentColor) {
      this.props.addToPalate({id: nextProps.currentColor.split('#')[1], size: "", fill: nextProps.currentColor, position: "" })
      this.props.removeCurrentColor()
    }
  if (nextProps.nextColors.length) {
    //console.log("nextColors", nextProps.nextColors)
    nextProps.nextColors.forEach( (color, i) => {
      this.props.addToPalate({id: color.split('#')[1], fill: color, position: "" })
    })
    this.props.removeNextColors()
  }
}

toArray (obj) {
  var array = [];
  for (var i = obj.length >>> 0; i--;) {
    array[i] = obj[i].outerHTML;
  }
  return array;
}

takeScreenShot = () => {
  //console.log("canuserefs", this.palate == document.getElementById('mainContainer'))
  const palateCopy = this.palate.cloneNode(true)
  const children = this.toArray(palateCopy.childNodes)
  const html = children.join('')
  const content = Parser(html)
  const filtered = content.filter(e => !e.type.match(/defs|desc/g) )
  let something
  //console.log(filtered)
  if (!filtered.length) {
    const before = filtered.props.children
    const sub = before.length ? before[before.length-1] : before
    const subsub = sub.props.children.length ? sub.props.children[0].props : sub.props.children.props
    something = [{id: content.props.id.replace('id', ''), mode: true, size: sub.props.transform , fill: subsub.fill, position: subsub.transform}]
  } else {
    something = filtered.map(element => {
    const before = element.props.children
    //console.log(element)
    const sub = before.length ? before[before.length-1] : before
    const subsub = sub.props.children.length ? sub.props.children[0].props : sub.props.children.props
    return ({id: element.props.id.replace('id', ''), mode: true, size: sub.props.transform , fill: subsub.fill, position: subsub.transform})
  })
  }
  this.props.resetPalate(something)
}

reorderMode = () => {
  this.setState({
    reorderMode: !this.state.reorderMode,
    deleteMode: false,
    save: true
  })
}

deleteMode = () => {
  this.setState({
    reorderMode: false,
    deleteMode: !this.state.deleteMode,
    save: true
  })
}

reorder = (circle, parentId) => {

  const index = this.props.palateEls.findIndex( e => `id${e.id}` == parentId )

    function rearrange(array, index) {
      let toAdd = array.splice(index,1)
      array.push(toAdd[0])
    }

  let copy = [...this.props.palateEls]
  rearrange(copy, index)
  this.props.resetPalate(copy)
}

deleteEl = ( circle, parentId ) => {
  let index = this.props.palateEls.findIndex(e => `id${e.id}` == parentId)
  let copy = [...this.props.palateEls]
  let newArr = copy.filter(el => `id${el.id}` != parentId )
  let color = copy[index].fill
  this.props.removeOneColor(color)
  this.props.resetPalate(newArr)
}

hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

hoverData = (parentId) => {
  const circle = this.props.palateEls.find(element => `id${element.id}` == parentId)
  const rgb = this.hexToRgb(circle.fill)
  this.setState({
    currentHoverData: `Hex Value: ${circle.fill}, RGB Value: ${rgb.r}, ${rgb.g}, ${rgb.b}`
  })
}

saveSVG = () => {
  const palateCopy = this.palate.cloneNode(true)
  const children = this.toArray(palateCopy.childNodes)
  const elements = children.filter(e => (e !== "<desc>Created with Snap</desc>") && (e !== "<defs></defs>") )
  const id = localStorage.getItem('userId') ? localStorage.getItem('userId') : null
  id ? this.props.savePalate(id, elements, this.props.title, this.props.note, this.props.colorsContainer) : alert("you must be logged in to save.")
}


  render () {
    const elements = this.props.palateEls.map((e, i) =>  <SVGElement key={`key${e.id}`} hoverData={this.hoverData} reorder={this.reorder} deleteEl={this.deleteEl} reorderMode={this.state.reorderMode} deleteMode={this.state.deleteMode} id={`id${e.id}`} fill={e.fill} size={e.size} position={e.position}/>)
    const colors = this.props.colorsContainer.map((e, i) => <div key={`side${e}`} style={{display: 'grid', backgroundColor: e, gridColumn: "1/2", width: '10px', height: '10px'}}/>)
    return (
      <div id='#palateContainer'>
        <div style={{display: 'grid', gridTemplateColumns: "1fr 9fr"}}>
          <div>
            {colors}
          </div>
          <svg ref={(palate) => this.palate = palate} style={{display: 'grid', gridColumn: '2/3', border: "1px solid grey"}} width={'400px'} height={'400px'} id={'mainContainer'} viewBox={"0 0 400 400"}>
            {elements}
          </svg>
        </div>


        <button onClick={this.reorderMode}>Reorder Mode</button>
        <button onClick={this.deleteMode}>Delete Mode</button>
        <button onClick={this.saveSVG}>Save</button>
        <p>{this.state.currentHoverData}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    colorsContainer: state.uploader.colorContainer,
    currentColor: state.uploader.color,
    palateEls: state.palate.otherPalate,
    nextColors: state.uploader.nextColors,
    title: state.palate.title,
    note: state.palate.note

    //reorder: state.palate.reorderMode
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     savePalate: (userId, svg, copyString) => {
//       dispatch(savePalate(userId, svg, copyString))
//     },
//     updatePalate: (currentPalate) => {
//       dispatch(updatePalate(currentPalate))
//     },
//     addToPalate: (svg) => {
//       dispatch(addToPalate(svg))
//     },
//     removeCurrentColor: () => {
//       dispatch(removeCurrentColor())
//     },
//     screenShot: () => {
//       dispatch(screenShot())
//     },
//     resetPalate: (array) => {
//       dispatch( resetPalate(array))
//     }
//   }
// }

export default connect(mapStateToProps, actions )(SVGContainer)
