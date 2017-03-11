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
        E.gfx.fillCircle(32+20,32+8, 4, 21);
        
        E.balls = [];

        E.t = 0;
        E.speedx = 2.1;
        E.speedy = 2.15;
        E.speedz = 2.1;
        E.rangex = 80;
        E.rangey = 80;
        E.rangez = 6;

        
        var i = 100;
        while(i--){
            E.balls.push({
                x: 0,
                y: 0,
                z: 0,
                offset: i/2
            })
        }
    },

    step: function(dt) {
        E.t += dt;
        
        var i = E.balls.length;
        while(--i){
            E.balls[i].x  = 110 + Math.floor(Math.sin((E.t + E.balls[i].offset) * E.speedx) * E.rangex);
            E.balls[i].y  = 110 + Math.floor(Math.sin((E.t + E.balls[i].offset) * E.speedy) * E.rangey);
            E.balls[i].z  = 12 + Math.floor(Math.sin((E.t + E.balls[i].offset) * E.speedz) * E.rangez);
        }
        E.balls.sort(function(a,b){return b.z - a.z});
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
        
        
        // var i = E.balls.length; 
        // E.renderSource = E.page2;
        // while(--i){
        //      E.gfx.spr(
                 
        //          32,
        //          32,
        //          32,
        //          32,
        //          E.balls[i].x,
        //          E.balls[i].y
                 
        //          );
            
        // }
        E.renderSource = E.page2;
        E.gfx.spr(32,32,32,32,32,32);
        E.gfx.spr(32,32,32,32,32,64,false, true);
        E.gfx.spr(32,32,32,32,64,32,true, false);
        E.gfx.spr(32,32,32,32,64,64,true, true);

        //console.log(E.t);
        
        var i = E.balls.length;
        while(--i){
            E.gfx.sspr(32,32,32,32, E.balls[i].x, E.balls[i].y, E.balls[i].z, E.balls[i].z);
        }



        
        
        this.makeColorBar();
        
        E.render();

    },

    
    makeColorBar: function(){
        for(var i = 0; i<32; i++) {
            E.gfx.fillRect(i*8, 0, (i*8)+8, 8, i);
        }
    }

}
