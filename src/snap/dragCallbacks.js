export const move = function(dx,dy) {
    this.attr({
                transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
            });
}

export const start = function() {
        this.data('origTransform', this.transform().local );
}
export const stop = function() {
        console.log('finished dragging');
}
