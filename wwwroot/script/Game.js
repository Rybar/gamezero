ENGINE.Game = {

    create: function() {
        E.x1 = 0;
        E.x2 = 255;
        E.y1 = 0;
        E.y2 = 255;

        E.dots = [];
        window.dots = E.dots;
        var i = 60;

        while(--i){
            E.dots.push({
                x: (Math.random()*255)|0,
                y: (Math.random()*255)|0,
                //z: (Math.random()*255)|0,
                z: (Math.random()*128)|0,
                color: (Math.random()*31)|0
            });
        }

        E.cursor = {
            x: 0,
            y: 0
        }
    },

    step: function(dt) {

        this.rotate(E.dots, 0.02, 0.01, 0.01);

        // if(E.y2 < 0) E.y2 = 255;

    },

    mousemove: function(data) {

        E.cursor.x = Math.floor(data.x/3);
        E.cursor.y = Math.floor(data.y/3);

    },

    keydown: function(data) {
        if (data.key == 's') {
            console.log('s pressed');
            this.app.setState(ENGINE.Music);
        }
        if (data.key == 'x') {
            E.screenCapture();
        }
    },

    render: function() {

        /* put your render calls there */
        E.screen.fill(1, 0, E.screen.length);
        E.gfx.line(0,128, 255,128,7);
        E.gfx.line(128,0, 128,255,7);
        //E.gfx.line(E.x1, E.y1, E.x2, E.y2, 6);

        E.gfx.line(E.cursor.x-4, E.cursor.y, E.cursor.x+4, E.cursor.y, 11);
        E.gfx.line(E.cursor.x, E.cursor.y-4, E.cursor.x, E.cursor.y+4, 31);


        var x1, x2, y1, y2

        i = E.dots.length;
        while(i--) {
            E.gfx.fillCircle(
                E.dots[i].x,
                E.dots[i].y,
                ((E.dots[i].z/255)*16)|0,
                E.dots[i].color
            )
        }

        var i;
        for(i = 0;i<32; i++) {
            E.gfx.fillRect(i*8, 0, (i*8)+8, 8, i);
        }

        E.dots.sort(function(a,b){return b.z - a.z});
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
}


};
