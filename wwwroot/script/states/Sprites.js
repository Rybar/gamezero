/**
 * Created by ryan on 3/6/17.
 */
/**
 * Created by ryan on 3/3/17.
 */
ENGINE.Sprites = {

    create: function() {

        E.cursor = {
            x: 0,
            y: 0
        };
        E.renderTarget = E.page2;
        E.gfx.fillCircle(32+16,32+16,16,1);
        E.gfx.fillCircle(32+18,32+14,12, 12);
        
        E.balls = [];
        
        var i = 1000;
        while(i--){
            E.balls.push({
                x: (Math.random()*255)|0,
                y: (Math.random()*255)|0
            })
        }
    },

    step: function(dt) {
        E.t += dt;
        
        var i = E.balls.length;
        while(--i){
            E.balls[i].x += (Math.random() * 4 - 2)|0;
            E.balls[i].y += (Math.random() * 4 - 2)|0;
            
        }
    },
    
    enter: function(dt) {
        
    },

    mousemove: function(data) {

        var rect = E.canvas.getBoundingClientRect();
        E.cursor.x = ( ( (data.x - rect.left)/3) |0 );
        E.cursor.y = ( ( (data.y - rect.top) /3) |0 );

    },


    keydown: function(data) {
        if (data.key == 's') {
            console.log(ENGINE.currentState);
            ENGINE.switchState();
        }
    },

    render: function(dt) {
        E.renderTarget = E.screen;
        E.gfx.clear(3);
        
        
        var i = E.balls.length; 
        E.renderSource = E.page2;
        while(--i){
             E.gfx.spr(
                 
                 32,
                 32,
                 32,
                 32,
                 E.balls[i].x,
                 E.balls[i].y
                 
                 );
            
        }
        
        E.gfx.spr(0,0,16,16, 200, 200);
        
        this.makeColorBar();
        
        E.render();

    },

    
    makeColorBar: function(){
        for(var i = 0; i<32; i++) {
            E.gfx.fillRect(i*8, 0, (i*8)+8, 8, i);
        }
    }

}
