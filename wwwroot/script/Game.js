/**
 * Created by ryan on 3/3/17.
 */
ENGINE.Game = {

    create: function() {

        E.bgColor = 0;
        E.fgColor = 21;

        E.cursor = {
            x: 0,
            y: 0
        };
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
            E.fgColor = E.screen[E.cursor.y * 256 + E.cursor.x];
        }
        else{
            E.ram[E.cursor.y * 256 + E.cursor.x] = E.fgColor;
        }



    },

    keydown: function(data) {
        if (data.key == 's') {
            console.log('s pressed');
            this.app.setState(ENGINE.Nodes);
        }
        if (data.key == 'x') {
            E.screenCapture();
        }
        if (data.key == 'm') {
            E.memoryCapture();
        }
    },

    render: function() {

        E.screen.fill(E.bgColor, 0, 0x10000);




        this.makeColorBar();

        E.gfx.pset(E.cursor.x-1, E.cursor.y, 21);
        E.gfx.pset(E.cursor.x+1, E.cursor.y, 21);
        E.gfx.pset(E.cursor.x, E.cursor.y+1, 21);
        E.gfx.pset(E.cursor.x, E.cursor.y-1, 21);


//color bars


        //this.noise();
        E.render();

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
