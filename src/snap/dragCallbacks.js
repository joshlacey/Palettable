export const move = function(dx,dy) {

  // for future testing of drag feature
        //   var clientX, clientY;
        // if( (typeof dx == 'object') && ( dx.type == 'touchmove') ) {
        //     clientX = dx.changedTouches[0].clientX;
        //     clientY = dx.changedTouches[0].clientY;
        //     dx = clientX - this.data('ox');
        //     dy = clientY - this.data('oy');
        // }
    this.attr({
                transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
            });
}

export const start = function(x,y) {
// for future testing of drag feature
  // if( (typeof x == 'object') && ( x.type == 'touchstart') ) {
  //       x.preventDefault();
  //       this.data('ox', x.changedTouches[0].clientX );
  //       this.data('oy', x.changedTouches[0].clientY );
  //   }
        this.data('origTransform', this.transform().local );
}
export const stop = function() {
        console.log('finished dragging');
}
