import React from 'react';
import Snap from 'snapsvg-cjs';
import addHandleFunc from '../../snap/scale.js'
import { start, move, stop } from '../../snap/dragCallbacks.js'
import { connect } from 'react-redux'
import { savePalate, updatePalate } from '../../actions/palate'

class SVGElement extends React.Component {

  componentDidMount = () => {

    //Creates object from svg created on first render.
    const s = Snap(`#${this.props.id}`)

    let myCircle = s.circle(50,50,50).attr({ fill: this.props.fill, transform: this.props.position })
    myCircle.mouseover(() => this.props.hoverData(this.props.id))
    myCircle.drag( move, start, stop )
    let handleGroup = s.group(myCircle)
    handleGroup.attr({ transform: this.props.size })
    //myCircle.dblclick(() => {handleGroup.remove(); addHandleFunc( myCircle, s, handleGroup, false)} )


    if(this.props.reorderMode) {
      myCircle.dblclick(() => this.props.reorder(myCircle, this.props.id))
    } else if (this.props.deleteMode) {
      myCircle.dblclick(() => this.props.deleteEl(myCircle, this.props.id))
    } else {
      myCircle.dblclick(() => {handleGroup.remove(); addHandleFunc( myCircle, s, handleGroup, false)} )
    }

  }

  componentWillReceiveProps = (nextProps) => {

    //Creates object from svg created on first render.
    document.getElementById(nextProps.id).innerHTML = ""
    const s = Snap(`#${nextProps.id}`)

    let myCircle = s.circle(50,50,50).attr({ fill: nextProps.fill, transform: nextProps.position })
    myCircle.mouseover(() => this.props.hoverData(nextProps.id))
    myCircle.drag( move, start, stop )
    let handleGroup = s.group(myCircle)
    handleGroup.attr({ transform: nextProps.size })
    if(nextProps.reorderMode) {
      myCircle.undblclick()
      myCircle.dblclick(() => this.props.reorder(myCircle, nextProps.id))
    } else if (nextProps.deleteMode) {
      myCircle.undblclick()
      myCircle.dblclick(() => this.props.deleteEl(myCircle, nextProps.id))
    } else {
      myCircle.undblclick()
      myCircle.dblclick(() => {handleGroup.remove(); addHandleFunc( myCircle, s, handleGroup, false)} )
    }
  }



  render() {
    //console.log('addedElement', "delete?", nextProps.reorderMode)
    return (
      <svg style={{cursor: 'pointer'}} id={this.props.id} />
    )
  }
}

function mapStateToProps(state) {
  return {
    currentPalate: state.palate.current
  }
}

function mapDispatchToProps(dispatch) {
  return {
    savePalate: (userId, svg, copyString) => {
      dispatch(savePalate(userId, svg, copyString))
    },
    updatePalate: (currentPalate) => {
      dispatch(updatePalate(currentPalate))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SVGElement)
