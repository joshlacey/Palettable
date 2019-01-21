/*global document*/
import React, { Component } from 'react';
import Snap from 'snapsvg-cjs';
import PropTypes from 'prop-types';
import addHandleFunc from '../../../../../../snap/scale.js';
import { start, move, stop } from '../../../../../../snap/dragCallbacks.js';

export default class SVGElement extends Component {
  static propTypes = {
    reorder: PropTypes.func,
    deleteEl: PropTypes.func,
    deleteMode: PropTypes.bool,
    reorderMode: PropTypes.bool,
    element: PropTypes.shape({
      id: PropTypes.string,
      fill: PropTypes.string,
      size: PropTypes.string,
      position: PropTypes.string
    })
  }

  componentDidMount() {
    this.snapAndAddEventListeners();
  }

  componentDidUpdate() {
    //remove any elements currently in the parent SVG
    const elementId = this.getElementId();
    document.getElementById(elementId).innerHTML = "";
    this.snapAndAddEventListeners();
  }

  getElementId = () => {
    return 'id' + this.props.element.id;
  }

  snapAndAddEventListeners() {
    const { element, reorder, deleteEl, deleteMode, reorderMode } = this.props;
    const elementId = this.getElementId();
    const s = Snap(`#${elementId}`);
    let myCircle = s.circle(50,50,50).attr({ fill: element.fill, transform: element.position });
    myCircle.drag( move, start, stop );
    let handleGroup = s.group(myCircle);
    handleGroup.attr({ transform: element.size });
    if(reorderMode) {
      myCircle.undblclick();
      myCircle.dblclick(() => reorder(myCircle, elementId));
    } else if (deleteMode) {
      myCircle.undblclick();
      myCircle.dblclick(() => deleteEl(myCircle, elementId));
    } else {
      myCircle.undblclick();
      myCircle.dblclick(() => {
        handleGroup.remove();
        addHandleFunc( myCircle, s, handleGroup, false)}
      );
    }
  }

  render() {
    const elementId = this.getElementId();
    return (
      <svg style={{cursor: 'pointer'}} id={elementId} />
    )
  }
}
