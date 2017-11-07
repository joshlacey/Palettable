import React from 'react';
import Snap from 'snapsvg-cjs';
import addHandleFunc from '../../snap/scale.js';
import { start, move, stop } from '../../snap/dragCallbacks.js';
import { connect } from 'react-redux';

class SVGElement extends React.Component {

  snapAndAddEventListeners (props) {
    const s = Snap(`#${props.id}`)
    let myCircle = s.circle(50,50,50).attr({ fill: props.fill, transform: props.position })
    myCircle.mouseover(() => this.props.hoverData(props.id))
    myCircle.drag( move, start, stop )
    let handleGroup = s.group(myCircle)
    handleGroup.attr({ transform: props.size })
    if(props.reorderMode) {
      myCircle.undblclick()
      myCircle.dblclick(() => this.props.reorder(myCircle, props.id))
    } else if (props.deleteMode) {
      myCircle.undblclick()
      myCircle.dblclick(() => this.props.deleteEl(myCircle, props.id))
    } else {
      myCircle.undblclick()
      myCircle.dblclick(() => {handleGroup.remove(); addHandleFunc( myCircle, s, handleGroup, false)} )
    }
  }

  componentDidMount = () => {
    this.snapAndAddEventListeners(this.props)
  }

  componentWillReceiveProps = (nextProps) => {
    //remove any elements currently in the parent SVG
    document.getElementById(nextProps.id).innerHTML = ""
    this.snapAndAddEventListeners(nextProps)
  }

  render() {
    return (
      <svg style={{cursor: 'pointer'}} id={this.props.id} />
    )
  }
}

//setting this equal to an undefined value in the palate state seems to work for some reason.
//if I change it to any other value the component breaks.
//if I remove connect the component breaks 
function mapStateToProps(state) {
  return {
    current: state.palate.current
  }
}


export default connect(mapStateToProps)(SVGElement)
