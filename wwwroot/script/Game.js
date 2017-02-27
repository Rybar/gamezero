ENGINE.Game = {

    create: function() {
        E.x1 = 0;
        E.x2 = 255;
        E.y1 = 0;
        E.y2 = 255;

        E.dots = [];
        E.cursor = {
            x: 0,
            y: 0
        }
    },

    step: function(dt) {

        if(E.y1 == 0) {
            E.x1 += 1;
            E.x2 -= 1;
        }

        if(E.x1 == 255){
            E.y2 -= 1;
            E.y1 += 1;
        }
        if(E.y1 == 255) {
            E.x1 = 0;
            E.x2 = 255;
            E.y1 = 0;
            E.y2 = 255;
        }


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
    },

    render: function() {

        /* put your render calls there */
        E.screen.fill(1, 0, E.screen.length);
        E.gfx.line(0,0,255,255,7);
        E.gfx.line(E.x1, E.y1, E.x2, E.y2, 6);

        E.gfx.line(E.cursor.x-4, E.cursor.y, E.cursor.x+4, E.cursor.y, 11);
        E.gfx.line(E.cursor.x, E.cursor.y-4, E.cursor.x, E.cursor.y+4, 31);

        E.render();

    }

};
