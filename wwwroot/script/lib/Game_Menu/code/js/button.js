var Button = function(text, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.clicked = false;
    this.hovered = false;
    this.text = text;
}

Button.prototype = _.extend(Button.prototype, UIObject);

Button.prototype.update = function(canvas) {
    var wasNotClicked = !this.clicked;
    this.updateStats(canvas);
    
    if (this.clicked && wasNotClicked) {
        if (!_.isUndefined(this.handler)) {
        	this.handler();
        }
    }
}



Button.prototype.draw = function(canvas) {
    //set color
    if (this.hovered) {
        canvas.setFillColor(0.3, 0.7, 0.6, 1.0);
    } else {
        canvas.setFillColor(0.2, 0.6, 0.5, 1.0);
    }
    
    //draw button
    canvas.fillRect(this.x, this.y, this.width, this.height);
    
    //text options
    var fontSize = 20;
    canvas.setFillColor(1, 1, 1, 1.0);
    canvas.font = fontSize + "px sans-serif";
    
    //text position
    var textSize = canvas.measureText(this.text);
    var textX = this.x + (this.width/2) - (textSize.width / 2);
    var textY = this.y + (this.height/2) - (fontSize/2);
    
    //draw the text
    canvas.fillText(this.text, textX, textY);
}