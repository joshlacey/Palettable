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
    save: false
  }

componentDidMount = () => {
  var test = Snap('#mainContainer')
  test.attr({ viewBox: "0 0 400 400" })
}

componentWillUpdate(nextProps, nextState) {
  if (nextState.save) {
    this.takeScreenShot()
    this.setState({save:false})
  }
  if (nextProps.currentColor) {
      this.props.addToPalate({id: "other" + (this.props.palateEls.length + 1), size: "", fill: nextProps.currentColor, position: "" })
      this.props.removeCurrentColor()
    }
  if (nextProps.nextColors.length) {
    console.log("nextColors", nextProps.nextColors)
    nextProps.nextColors.forEach( (color, i) => {
      this.props.addToPalate({id: "other" + (this.props.palateEls.length + i), size: "", fill: color, position: "" })
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
  const palateCopy = document.getElementById('mainContainer').cloneNode(true)
  const children = this.toArray(palateCopy.childNodes)
  children.shift()
  children.shift()
  const html = children.join('')
  const content = Parser(html)
  let something
  console.log(content)
  if (!content.length) {
    const before = content.props.children
    const sub = before.length ? before[before.length-1] : before
    const subsub = sub.props.children.length ? sub.props.children[0].props : sub.props.children.props
    something = [{id: content.props.id, mode: true, size: sub.props.transform , fill: subsub.fill, position: subsub.transform}]
  } else {
    something = content.map(element => {
    const before = element.props.children
    const sub = before.length ? before[before.length-1] : before
    const subsub = sub.props.children.length ? sub.props.children[0].props : sub.props.children.props
    return ({id: element.props.id, mode: true, size: sub.props.transform , fill: subsub.fill, position: subsub.transform})
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

reorder = (circle, parentId) => {

  const index = this.props.palateEls.findIndex( e => e.id == parentId )

    function swapElement(array, indexA, indexB) {
      let tmp = array[indexA];
      array[indexA] = array[indexB];
      array[indexB] = tmp;
    }

  let copy = [...this.props.palateEls]
  swapElement(copy, index, copy.length-1)
  this.props.resetPalate(copy)
}

saveSVG = () => {
  const palateCopy = document.getElementById('mainContainer').cloneNode(true)
  const children = this.toArray(palateCopy.childNodes)
  children.shift()
  children.shift()

  const id = localStorage.getItem('userId') ? localStorage.getItem('userId') : null
  id ? this.props.savePalate(id, children) : alert("you must be logged in to save.")

}

  render () {
    const elements = this.props.palateEls.map((e, i) => <SVGElement key={e.id} reorder={this.reorder} mode={this.state.reorderMode} id={e.id} fill={e.fill} size={e.size} position={e.position}/>)

    return (
      <div id='#palateContainer'>

        <svg width={'400px'} height={'400px'} id={'mainContainer'} >
          {elements}
        </svg>

        <button onClick={this.reorderMode}>Reorder Palate</button>
        <button onClick={this.saveSVG}>Save</button>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    colorsContainer: state.uploader.colorContainer,
    currentColor: state.uploader.color,
    palateEls: state.palate.otherPalate,
    nextColors: state.uploader.nextColors
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
