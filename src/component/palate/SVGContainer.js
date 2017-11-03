import React from 'react';
import Parser from 'html-react-parser'
import { connect } from 'react-redux'
import SVGElement from './SVGElement'
import '../../index.css'
import { savePalate, updatePalate, addToPalate, removeCurrentColor, screenShot, resetPalate, removeOneColor, removePalateEls, removeNextColors } from '../../actions/palate'
import { removeColors } from '../../actions/uploader'

class SVGContainer extends React.Component {

  state = {
    reorderMode: false,
    deleteMode: false,
    save: false,
    currentHoverData: ""
  }


componentWillUpdate(nextProps, nextState) {
  if (nextState.save) {
    this.takeScreenShot()
    this.setState({save:false})
  }
  if (nextProps.currentColor) {
      this.props.addToPalate({id: nextProps.currentColor.split('#')[1], size: "", fill: nextProps.currentColor, position: "" })
      this.props.removeCurrentColor()
    }
  if (nextProps.nextColors.length) {
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
  debugger
  //Check to see weather or not the palette is empty to avoid changing running this function on empty container
  if([...this.palate.childNodes].filter(e => e.nodeName === "svg").length) {
    const palateCopy = this.palate.cloneNode(true)
    debugger
    const children = this.toArray(palateCopy.childNodes)
    const html = children.join('')
    const content = Parser(html)
    const filtered = content.filter(e => !e.type.match(/defs|desc/g) )
    let something
    if (!filtered.length) {
      const before = filtered.props.children
      const sub = before.length ? before[before.length-1] : before
      const subsub = sub.props.children.length ? sub.props.children[0].props : sub.props.children.props
      something = [{id: content.props.id.replace('id', ''), mode: true, size: sub.props.transform , fill: subsub.fill, position: subsub.transform}]
    } else {
      something = filtered.map(element => {
      const before = element.props.children
      const sub = before.length ? before[before.length-1] : before
      const subsub = sub.props.children.length ? sub.props.children[0].props : sub.props.children.props
      return ({id: element.props.id.replace('id', ''), mode: true, size: sub.props.transform , fill: subsub.fill, position: subsub.transform})
    })
    }
    this.props.resetPalate(something)
  } else {
    this.props.resetPalate([])
  }
}

reorderMode = () => {
  if(this.palate.children.length) {
    this.setState({
      reorderMode: !this.state.reorderMode,
      deleteMode: false,
      save: true
    })
  } else {
    null
  }
}

deleteMode = () => {
  if(this.palate.children.length) {
    this.setState({
      reorderMode: false,
      deleteMode: !this.state.deleteMode,
      save: true
    })
  } else {
    return null
  }
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
  if (this.palate.children.length) {
    const palateCopy = this.palate.cloneNode(true)
    const children = this.toArray(palateCopy.childNodes)
    const elements = children.filter(e => (e !== "<desc>Created with Snap</desc>") && (e !== "<defs></defs>") )
    const id = localStorage.getItem('userId') ? localStorage.getItem('userId') : null
    console.log(this.props.colorsContainer)
    id ? this.props.savePalate(id, elements, this.props.title, this.props.note, this.props.colorsContainer) : alert("you must be logged in to save.")
    id ? alert("Palate Saved") : null
    this.props.removePalateEls()
    this.props.removeColors()
  } else {
    return null
  }
}


  render () {
    const elements = this.props.palateEls.map((e, i) =>  <SVGElement key={`key${e.id}`} hoverData={this.hoverData} reorder={this.reorder} deleteEl={this.deleteEl} reorderMode={this.state.reorderMode} deleteMode={this.state.deleteMode} id={`id${e.id}`} fill={e.fill} size={e.size} position={e.position}/>)
    return (
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', justifyContent: 'center', gridGap: '1em'}} id='#palateContainer'>
        <div style={{gridColumn: '1/4', marginLeft: 'auto', marginRight: 'auto'}}>
          <svg ref={(palate) => this.palate = palate} style={{display: 'grid', gridColumn: '1/2', border: "1px solid #ccc"}} width={'400px'} height={'400px'} id={'mainContainer'} viewBox={"0 0 400 400"}>
            {elements}
          </svg>
        </div>
          <button className={"nice-button palate-button"} style={ this.state.reorderMode ? {backgroundColor: 'rgba(0, 255, 0, .5)'} : null} onClick={this.reorderMode}>Reorder Mode</button>
          <button className={"nice-button palate-button"} style={ this.state.deleteMode ? {backgroundColor: 'rgba(0, 255, 0, .5)'} : null} onClick={this.deleteMode}>Delete Mode</button>
          <button className={"nice-button palate-button"} onClick={this.saveSVG}>Save</button>
        <div style={{gridColumn: '1/4', textAlign: 'center', height: '30px'}}><p>{this.state.currentHoverData}</p></div>
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    savePalate: (id, elements, title, note, colorsContainer) => {
      dispatch(savePalate(id, elements, title, note, colorsContainer))
    },
    updatePalate: (currentPalate) => {
      dispatch(updatePalate(currentPalate))
    },
    addToPalate: (svg) => {
      dispatch(addToPalate(svg))
    },
    removeCurrentColor: () => {
      dispatch(removeCurrentColor())
    },
    screenShot: () => {
      dispatch(screenShot())
    },
    resetPalate: (array) => {
      dispatch( resetPalate(array))
    },
    removeOneColor: (color) => {
      dispatch( removeOneColor(color) )
    },
    removeColors: () => {
      dispatch ( removeColors() )
    },
    removePalateEls: () => {
      dispatch ( removePalateEls() )
    },
    removeNextColors: () => {
      dispatch ( removeNextColors() )
    }
  }
}



export default connect( mapStateToProps, mapDispatchToProps )(SVGContainer)
