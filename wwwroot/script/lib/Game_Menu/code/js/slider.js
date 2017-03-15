var Slider = function(x, y, width, min, max) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 40;
    this.value = min;
    this.min = min;
    this.max = max;
    this.clicked = false;
    this.hovered = false;
}


Slider.prototype = _.extend(Slider.prototype, UIObject);

Slider.prototype.update = function(canvas) {
    this.updateStats(canvas);
    
    if (this.clicked) {
        var pos = canvas.mouse.x;
        
        pos = Math.max(pos, this.x);
        pos = Math.min(pos, this.x + this.width);
        
        var range = this.max - this.min;
        var percent = (pos - this.x) / this.width;
        
        this.value = Math.round(this.min + (percent * range));
        
        if (!_.isUndefined(this.handler)) {
        	this.handler(this.value);
        }
    }
}

Slider.prototype.draw = function(canvas) {
   	//draw the bar
    canvas.setFillColor(0, 0, 0, 1.0);
    canvas.fillRect(this.x, this.y + (this.height/4), this.width, this.height/2);
    
    //set color
    if (this.hovered) {
        canvas.setFillColor(0.3, 0.7, 0.6, 1.0);
    } else {
        canvas.setFillColor(0.2, 0.6, 0.5, 1.0);
    }
    
    //draw the slider handle
    var range = this.max - this.min;
    var percent = (this.value - this.min) / range;
    var pos = this.x + (this.width*percent);
    canvas.fillRect(pos-5, this.y, 10, this.height);
}