ENGINE.Nodes = {

    create: function() {
        E.x1 = 0;
        E.x2 = 255;
        E.y1 = 0;
        E.y2 = 255;

        E.dots = [];
        window.dots = E.dots;
        var i = 300;

        while(--i){
            E.dots.push({
                x: (Math.random()*255)|0,
                y: (Math.random()*255)|0,
                //z: (Math.random()*255)|0,
                z: (Math.random()*255)|0,
                color: (Math.random()*31)|0
            });
        }

        E.cursor = {
            x: 0,
            y: 0
        }
    },

    step: function(dt) {

        this.rotate(E.dots, 0.0095, 0.000, 0.009);
        for(var i = 0; i < E.dots.length; i++){
            E.dots[i].y += (Math.random()*2) - 1;
        }
        E.dots.sort(function(a,b){return a.z - b.z});

        // if(E.y2 < 0) E.y2 = 255;

    },

    mousemove: function(data) {

        E.cursor.x = Math.floor(data.x/3);
        E.cursor.y = Math.floor(data.y/3);

    },

    keydown: function(data) {
        if (data.key == 's') {
            console.log(ENGINE.currentState);
            ENGINE.switchState();
        }
        if (data.key == 'x') {
            E.screenCapture();
        }
    },

    render: function() {

        E.screen.fill(0, 0, E.screen.length);


        E.gfx.line(E.cursor.x-4, E.cursor.y, E.cursor.x+4, E.cursor.y, 11);
        E.gfx.line(E.cursor.x, E.cursor.y-4, E.cursor.x, E.cursor.y+4, 31);


        for(var i = 0; i < E.dots.length; i++){
            var nodeA = E.dots[i]


            for(var i = 0; i < E.dots.length; i++){
                var bIndex = (E.dots[i].z.map(0, 350, 0, 31))|0;
                E.gfx.fillCircle( E.dots[i].x,  E.dots[i].y,  ((E.dots[i].z/255)*6)|0, E.brightness[bIndex]);
                var nodeA = E.dots[i]
                for(var j = i+1; j < E.dots.length; j++){

                    var nodeB = E.dots[j];
                    var dx = nodeB.x - nodeA.x,
                        dy = nodeB.y - nodeA.y,
                        dist = Math.sqrt(dx * dx + dy * dy);
                    if(dist < 32){
                        E.gfx.line(E.dots[i].x, E.dots[i].y, E.dots[j].x, E.dots[j].y, E.brightness[32-(dist|0)]);
                    }
                }
            }

        }

//color bars
        this.makeColorBar();

        this.noise();
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
