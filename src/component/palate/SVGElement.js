import React from 'react';
import Snap from 'snapsvg-cjs';

//Snap.plugin borrowed from http://svg.dabbles.info/snaptut-drag-limit

class SVGElement extends React.Component {


  componentDidMount = () => {
    const s = Snap(`#${this.props.id}`)

    var moveS = function(dx,dy) {
        this.attr({
                    transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
                });
    }

    var startS = function() {
            this.data('origTransform', this.transform().local );
    }
    var stopS = function() {
            console.log('finished dragging');
    }

    var dragging = 0;
    var handleGroup;

    function addHandleFunc() {
            if( dragging == 0 ) {
                    dragging = 1;
                    var bb = this.getBBox();
                    var handle = new Array();
                    //handle[0] = s.circle(bb.x,bb.y,10).attr({class: 'handler'});;
                    handle[0] = s.circle(bb.x+bb.width, bb.y+bb.height/2, 10).attr({class: 'handler'});
                    handleGroup = s.group(this, handle[0]);
                    handleGroup.drag(move,start,stop);
            } else {
                    dragging = 0;
                    s.append(this);
                    handleGroup.selectAll('handler').remove();
                    handleGroup.remove();
            }
    }

    var start = function() {
            this.data('origTransform', this.transform().local);
    }

    var move = function(dx,dy) {
            var scale = 1 + dx / 50;
            this.attr({
                    transform: this.data('origTransform') + (this.data('origTransform') ? "S" : "s") + scale
            });
    }

    var stop = function() {
      this[1].remove()
      this.undrag()
    };




    let myCircle2 = s.circle(50,50,50).attr({ fill: this.props.fill })
    var mode = this.props.editMode ? addHandleFunc : () => console.log('not in edit mode')
    myCircle2.dblclick( addHandleFunc ).drag( moveS, startS, stopS )
  }




  render() {
    return (
      <svg id={this.props.id} />
    )
  }
}

export default SVGElement
