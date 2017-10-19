import React from 'react';
import Snap from 'snapsvg-cjs';
import Parser from 'html-react-parser'
import addHandleFunc from '../../snap/scale.js'
import { start, move, stop } from '../../snap/dragCallbacks.js'
import { connect } from 'react-redux'
import { savePalate, updatePalate } from '../../actions/palate'

class SVGElement extends React.Component {



  // elStop = (circle, outer) => {
  //   const g = circle.outerSVG()
  //   const index = outer.state.palate.findIndex(e => e.props.id == circle.parent().node.id)
  //   outer.state.palate[index].props.children[2] = Parser(g)
  //   console.log(outer.state.palate[index])
  //   this.setState({palate: outer.state.palate})
  //   console.log(this.state.palate)
  // }

  componentDidMount = () => {

    //Creates object from svg created on first render.
    const s = Snap(`#${this.props.id}`)

    let myCircle = s.circle(50,50,50).attr({ fill: this.props.fill, transform: this.props.position })
    myCircle.drag( move, start, stop )
    let handleGroup = s.group(myCircle)
    handleGroup.attr({ transform: this.props.size })
    myCircle.dblclick(() => {handleGroup.remove(); addHandleFunc( myCircle, s, handleGroup, false)} )
  }

  componentWillReceiveProps = (nextProps) => {
    //Creates object from svg created on first render.
    document.getElementById(nextProps.id).innerHTML = ""
    const s = Snap(`#${nextProps.id}`)


    let myCircle = s.circle(50,50,50).attr({ fill: nextProps.fill, transform: nextProps.position })
    myCircle.drag( move, start, stop )
    let handleGroup = s.group(myCircle)
    handleGroup.attr({ transform: nextProps.size })
    if(nextProps.mode) {
      myCircle.undblclick()
      myCircle.dblclick(() => this.props.reorder(myCircle, nextProps.id))
    } else {
      myCircle.undblclick()
      myCircle.dblclick(() => {handleGroup.remove(); addHandleFunc( myCircle, s, handleGroup, false)} )
    }
  }



  render() {
    console.log("elementrendering")
    return (
      <svg id={this.props.id} />
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
