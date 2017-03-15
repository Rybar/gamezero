var CheckBox = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.checked = false;
    this.clicked = false;
    this.hovered = false;
}

CheckBox.prototype = _.extend(CheckBox.prototype, UIObject);

CheckBox.prototype.update = function(canvas) {
    var wasNotClicked = !this.clicked;
    this.updateStats(canvas);
    
    if (this.clicked && wasNotClicked) {
        this.checked = !this.checked;
        
        if (!_.isUndefined(this.handler)) {
        	this.handler(this.checked);
        }
    }
}

CheckBox.prototype.draw = function(canvas) {
    //draw outer box
    canvas.setStrokeColor(0, 0, 0, 1.0);
    canvas.setLineWidth(4);
    canvas.strokeRect(this.x, this.y, this.width, this.height);
    
    //draw check or x
    canvas.font = "26px sans-serif";
    if (this.checked) {
        canvas.setFillColor(0.2, 0.6, 0.5, 1.0);
        canvas.fillText("\u2713", this.x+5, this.y);
    } else {
        canvas.setFillColor(0.6, 0.2, 0.2, 1.0);
        canvas.fillText("\u2715", this.x+5, this.y);
    }
}