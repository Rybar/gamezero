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
        E.gfx.fillCircle(32+16,32+16,15,1);
        E.gfx.fillCircle(32+16,32+16,13, 2);
        E.gfx.fillCircle(32+17,32+15,11, 3);
        E.gfx.fillCircle(32+18,32+14,9, 4);
        E.gfx.fillCircle(32+21,32+10, 4, 5);
        E.gfx.fillCircle(32+21,32+10, 3, 6);
        E.gfx.circle(32+22,32+9, 1, 21);
        E.gfx.pset(32+22,32+9, 21);

        E.balls = [];

        E.t = 0;
        E.speedx = 2.16;
        E.speedy = 2.14;
        E.speedz = 2.19;
        E.rangex = 60;
        E.rangey = 60;
        E.rangez = 60;

        
        var i = 100;
        while(i--){
            E.balls.push({
                x: 0,
                y: 0,
                z: 0,
                offset: i
            })
        }
    },

    step: function(dt) {
        E.t += dt;
        
        var i = E.balls.length;
        //E.speedx = 2.135 + Math.sin()
        while(--i){
            E.balls[i].x  = 128 + Math.floor(Math.sin((E.t + E.balls[i].offset) * E.speedx) * E.rangex);
            E.balls[i].y  = 128 + Math.floor(Math.sin((E.t + E.balls[i].offset) * E.speedy) * E.rangey);
            E.balls[i].z  = 120 + Math.floor(Math.cos((E.t + E.balls[i].offset) * E.speedz) * E.rangez);
        }
        this.rotate(E.balls, E.t/3, E.t/4, E.t/2);
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
        E.gfx.clear(0);
        
        
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
        //E.gfx.spr(32,32,32,32,32,32);
        //E.gfx.spr(32,32,32,32,32,64,false, true);
        //E.gfx.spr(32,32,32,32,64,32,true, false);
        //E.gfx.spr(32,32,32,32,64,64,true, true);

        //console.log(E.t);
        
        var i = E.balls.length;
        while(--i){
            E.gfx.sspr(
                32,32,32,32,
                (E.balls[i].x|0) - (E.balls[i].z/20)|0,
                (E.balls[i].y|0) - (E.balls[i].z/20)|0,
                (E.balls[i].z/10)|0,
                (E.balls[i].z/10)|0
            );
        }
        E.gfx.sspr(
            32,32,32,32,
            220,220,32,32)
        this.makeColorBar();
        
        E.render();

    },

    
    makeColorBar: function(){
        for(var i = 0; i<32; i++) {
            E.gfx.fillRect(i*8, 0, (i*8)+8, 8, i);
        }
    },

    rotate: function(points, pitch, roll, yaw) {
        var cosa = Math.cos(yaw);
        var sina = Math.sin(yaw);

        var cosb = Math.cos(pitch);
        var sinb = Math.sin(pitch);

        var cosc = Math.cos(roll);
        var sinc = Math.sin(roll);

        var Axx = cosa*cosb;
        var Axy = cosa*sinb*sinc - sina*cosc;
        var Axz = cosa*sinb*cosc + sina*sinc;

        var Ayx = sina*cosb;
        var Ayy = sina*sinb*sinc + cosa*cosc;
        var Ayz = sina*sinb*cosc - cosa*sinc;

        var Azx = -sinb;
        var Azy = cosb*sinc;
        var Azz = cosb*cosc;

        for (var i = 0; i < points.length; i++) {
            var px = points[i].x-128;
            var py = points[i].y-128;
            var pz = points[i].z-128;

            points[i].x = (Axx*px + Axy*py + Axz*pz)+128;
            points[i].y = (Ayx*px + Ayy*py + Ayz*pz)+128;
            points[i].z = (Azx*px + Azy*py + Azz*pz)+128;
        }
    },

}
