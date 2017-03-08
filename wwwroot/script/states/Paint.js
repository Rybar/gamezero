/**
 * Created by ryan on 3/3/17.
 */
ENGINE.Paint = {

    create: function() {

        E.bgColor = 0;
        E.fgColor = 21;

        E.cursor = {
            x: 0,
            y: 0
        };
        


    },
    
    onEnter: function() {
        
        E.renderTarget = 0x00000;
        E.gfx.clear(0);
        E.renderTarget = 0x10000;
        E.gfx.clear(0);
        E.renderTarget = 0x00000;
        
    },

    step: function(dt) {

        // if(E.y2 < 0) E.y2 = 255;

        if(this.app.mouse.left){
            E.ram[E.cursor.y * 256 + E.cursor.x] = E.fgColor;
        }

    },

    mousemove: function(data) {

        var rect = E.canvas.getBoundingClientRect();
        E.cursor.x = ( ( (data.x - rect.left)/3) |0 );
        E.cursor.y = ( ( (data.y - rect.top) /3) |0 );

    },

    mousedown: function(data) {

        if(E.cursor.y < 9){
            E.fgColor = E.ram[E.cursor.y * 256 + E.cursor.x];
        }
        else{
            E.renderTarget = 0x10000;
            E.gfx.pset(E.cursor.x, E.cursor.y, E.fgColor);
            E.renderTarget = 0x00000;
        }



    },

    keydown: function(data) {
        if (data.key == 's') {
            console.log(ENGINE.currentState);
            ENGINE.switchState();
        }
        if (data.key == 'x') {
            E.screenCapture();
        }
        if (data.key == 'm') {
            E.memoryCapture();
        }
    },

    touchend: function(data) {

    },

    render: function() {

        E.gfx.clear(0);

        this.makeColorBar();

        E.gfx.circle(E.cursor.x, E.cursor.y, 1, 21);
        
        E.ram.copyWithin(0x00000, 0x10000-256*9, 0x20000);

        E.render();

    },

    noise: function(){
        for(var i = 0; i < 0x10000; i++){
            if(Math.random() < .10 && E.screen[i] != 0) E.screen[i] -= 1;
            //if(E.screen[i] < 0)E.screen[i] = 31;
        }
    },

    makeColorBar: function(){
        for(var i = 0; i<32; i++) {
            E.gfx.fillRect(i*8, 0, (i*8)+8, 8, i);
        }
    }

}


