/*global alert*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import SVGElement from './modules/SVGElement';
import Button from './modules/Button';
import * as utils from '../../../../../utils/helpers';
import './style.scss';

export default class SVGContainerComponent extends Component {

  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    paletteColorsUsedTracker: PropTypes.array
  }

  state = {
    reorderMode: false,
    deleteMode: false,
    takingSnapshot: false,
    currentHoverData: '',
    paletteElements: []
  };

  getSnapshotBeforeUpdate() {
    return this.takeScreenShot();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.takingSnapshot) {
      this.setState({
        paletteElements: snapshot,
        takingSnapshot: false
      });
    }
    const trackedColors = this.props.paletteColorsUsedTracker;
    if (trackedColors.length > prevProps.paletteColorsUsedTracker.length) {
      const newColor = trackedColors[trackedColors.length - 1];
      const newPaletteElement = {
        id: newColor.split('#')[1],
        fill: newColor,
        position: ''
      }
      this.setState({
        paletteElements: [...snapshot, newPaletteElement]
      });
    }
  }

  componentWillUnmount() {
    this.cleanPalette();
  }

  cleanPalette = () => {
    this.props.actions.removeColors();
  };

  organizeDOMObject(obj) {
    const children = obj.props.children;
    //if children returns an array take the last one that was rendered which should be the actual circle
    const circle = children.length ? children[children.length - 1] : children;
    //pull out the props of the circle and account for if there are multiple children
    const circleProps = circle.props.children.length
      ? circle.props.children[0].props
      : circle.props.children.props;
    return {
      id: obj.props.id.replace('id', ''),
      size: circle.props.transform,
      fill: circleProps.fill,
      position: circleProps.transform
    };
  }

  takeScreenShot = () => {
    //Check to see weather or not the palette is empty to avoid changing running this function on empty container
    if ([...this.palate.childNodes].filter(e => e.nodeName === 'svg').length) {
      //use spread operator to turn DOM array into Array.prototype, return outerHTML of each and then join to one string
      const html = [...this.palate.childNodes].map(e => e.outerHTML).join('');
      //Parse the content to turn it into array of Objects
      const content = Parser(html);
      //Take out elements of type defs or desc, these are extras added by Snap.svg
      const filtered = content.filter(e => !e.type.match(/defs|desc/g));
      let schematics = filtered.map(this.organizeDOMObject);
      //update schematics of how svg elements should be rendered to the page
      return schematics;
    } else {
      return [];
    }
  };

  setReorderMode = () => {
    if(this.paletteIsEmpty()) return null;
    this.setState({
      reorderMode: true,
      deleteMode: false,
      takingSnapshot: true
    });
  };

  setDeleteMode = () => {
    if(this.paletteIsEmpty()) return null;
    this.setState({
      reorderMode: false,
      deleteMode: true,
      takingSnapshot: true
    });
  };

  paletteIsEmpty = () => {
    return !this.palate.children.length;
  }

  reorder = (circle, parentId) => {
    const screenShot = this.takeScreenShot();
    const index = screenShot.findIndex(
      e => `id${e.id}` === parentId.toString()
    );
    function rearrange (array, index) {
      let toAdd = array.splice(index, 1);
      array.push(toAdd[0]);
    }
    let copy = [...screenShot];
    rearrange(copy, index);
    this.setState({
      paletteElements: copy
    })
  };

  deleteEl = (circle, parentId) => {
    const screenShot = this.takeScreenShot();
    let index = screenShot.findIndex(
      e => `id${e.id}` === parentId.toString()
    );
    let copy = [...screenShot];
    let filteredElements = copy.filter(el => `id${el.id}` !== parentId.toString());
    let color = copy[index].fill;
    this.props.actions.removeOneColor(color);
    this.setState({
      paletteElements: filteredElements
    })
  };

  saveSVG = () => {
    if (this.palate.children.length) {
      const children = [...this.palate.childNodes].map(e => e.outerHTML);
      const elements = children.filter(
        e => e !== '<desc>Created with Snap</desc>' && e !== '<defs></defs>'
      );
      const id = utils.getUserId();
      if (id) {
        const { paletteColorsUsedTracker, actions } = this.props;
        actions.savePalate(id, elements, paletteColorsUsedTracker);
      } else {
        alert('you must be logged in to save.');
      }
      this.cleanPalette();
    } else {
      return null;
    }
  };

  render() {
    const { paletteElements } = this.state;
    const elements = paletteElements.length ? paletteElements.map((element) => (
      <SVGElement
        key={'key' + element.id}
        reorder={this.reorder}
        deleteEl={this.deleteEl}
        reorderMode={this.state.reorderMode}
        deleteMode={this.state.deleteMode}
        element={element}
      />
    )) : null;
      return (
        <div className='svg-container__wrapper'>
          <div className='svg-container__palette--wrapper'>
            <svg
              ref={palate => (this.palate = palate)}
              className='svg-container__palette--canvas'
              width={'400px'}
              height={'400px'}
              id={'mainContainer'}
              viewBox={'0 0 400 400'}
            >
              {elements}
            </svg>
          </div>
          {paletteElements ? (
            <p className='svg-container__palette--instructions'>
              Click and drag to move. Double click to manipulate.
            </p>
          ) : null}
          <Button label='Reorder Mode'
            selected={this.state.reorderMode}
            handleClick={this.setReorderMode}
          />
          <Button label='Delete Mode'
            selected={this.state.deleteMode}
            handleClick={this.setDeleteMode}
          />
          <Button label='Save'
            selected={false}
            handleClick={this.saveSVG} />
          <div className='svg-container__palette--hover-data'>
            <p>{this.state.currentHoverData}</p>
          </div>
        </div>
      );
    }
}
