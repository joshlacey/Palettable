export function move(dx,dy) {
	this.attr({
		transform: this.data('origTransform') + (this.data('origTransform') ? 'T' : 't') + [dx, dy]
	});
}

export function start() {
	this.data('origTransform', this.transform().local );
}

export function stop() {
	return null;
}
