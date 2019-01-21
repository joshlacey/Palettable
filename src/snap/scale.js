function startAHF() {
	this.data('origTransform', this.transform().local);
}

function moveAHF(dx) {
	var scale = 1 + dx / 50;
	this.attr({
		transform: this.data('origTransform') + (this.data('origTransform') ? 'S' : 's') + scale
	});
}

function stopAHF() {
	this[1].remove();
	this.undrag();
}

export default function addHandleFunc(el, s, handleGroup, dragging) {
	if( dragging === false ) {
		dragging = true;
		var bb = el.getBBox();
		var handle = s.circle(bb.x+bb.width, bb.y+bb.height/2, 10).attr({class: 'handler'});
		handleGroup = s.group(el, handle);
		handleGroup.drag(moveAHF,startAHF,stopAHF);
	} else {
		dragging = false;
		s.append(el);
		handleGroup.selectAll('handler').remove();
		handleGroup.remove();
	}
}
