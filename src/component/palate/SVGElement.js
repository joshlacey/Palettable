import React from 'react';
import Snap from 'snapsvg-cjs';

//Snap.plugin borrowed from http://svg.dabbles.info/snaptut-drag-limit
              (function() {

                Snap.plugin( function( Snap, Element, Paper, global ) {

                      Element.prototype.limitDrag = function( params ) {
                              this.data('minx', params.minx ); this.data('miny', params.miny );
                              this.data('maxx', params.maxx ); this.data('maxy', params.maxy );
                              this.data('x', params.x );    this.data('y', params.y );
                              this.data('ibb', this.getBBox() );
                              this.data('ot', this.transform().local );
                              this.drag( limitMoveDrag, limitStartDrag );
                              return this;
                      };

                      function limitMoveDrag( dx, dy ) {
                              var tdx, tdy;
                              var sInvMatrix = this.transform().globalMatrix.invert();
                              sInvMatrix.e = sInvMatrix.f = 0;
                              tdx = sInvMatrix.x( dx,dy ); tdy = sInvMatrix.y( dx,dy );

                              this.data('x', +this.data('ox') + tdx);
                              this.data('y', +this.data('oy') + tdy);
                              if( this.data('x') > this.data('maxx') - this.data('ibb').width  )
                                      { this.data('x', this.data('maxx') - this.data('ibb').width  ) };
                              if( this.data('y') > this.data('maxy') - this.data('ibb').height )
                                      { this.data('y', this.data('maxy') - this.data('ibb').height ) };
                              if( this.data('x') < this.data('minx') ) { this.data('x', this.data('minx') ) };
                              if( this.data('y') < this.data('miny') ) { this.data('y', this.data('miny') ) };
                              this.transform( this.data('ot') + "t" + [ this.data('x'), this.data('y') ]  );
                      };

                      function limitStartDrag( x, y, ev ) {
                              this.data('ox', this.data('x')); this.data('oy', this.data('y'));
                      };
                });
              })();




class SVGElement extends React.Component {


  componentDidMount = () => {
    const s = Snap(`#${this.props.id}`)


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




    let myCircle2 = s.circle(50,50,50).attr({ fill: this.props.fill }).limitDrag({ x: 0, y: 0, minx: 0, miny: 0, maxx: 400, maxy: 400 });
    var mode = this.props.editMode ? addHandleFunc : () => console.log('not in edit mode')
    myCircle2.dblclick( addHandleFunc )
  }




  render() {
    return (
      <svg id={this.props.id} />
    )
  }
}

export default SVGElement
