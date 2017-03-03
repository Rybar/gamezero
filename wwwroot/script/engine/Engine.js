ENGINE = {
    E: this,

    /*
     screen memory

     each px:

     000 /flags? 00000 /color -32 color index
     */

    //DB32 Palette
    colors: [0xff000000, 0xff342022, 0xff3c2845, 0xff313966, 0xff3b568f, 0xff2671df, 0xff66a0d9, 0xff9ac3ee, 0xff36f2fb,
        0xff50e599, 0xff30be6a, 0xff6e9437, 0xff2f694b, 0xff244b52, 0xff393c32, 0xff743f3f, 0xff826030, 0xffe16e5b,
        0xffff9b63, 0xffe4cd5f, 0xfffcdbcb, 0xffffffff, 0xffb7ad9b, 0xff877e84, 0xff6a6a69, 0xff525659, 0xff8a4276,
        0xff3232ac, 0xff6357d9, 0xffba7bd7, 0xff4a978f, 0xff306f8a],

    //col enum
    col: {
        Black: 0,
        Valhalla: 1,
        LouLou: 2,
        OiledCedar: 3,
        Rope: 4,
        TahitiGold: 5,
        Twine: 6,
        Pancho: 7,
        GoldenFizz: 8,
        Atlantis: 9,
        Christi: 10,
        ElfGreen: 11,
        Dell: 12,
        Verdigris: 13,
        Opal: 14,
        DeepKoamaru: 15,
        VeniceBlue: 16,
        RoyalBlue: 17,
        Cornflower: 18,
        Viking: 19,
        LightSteelBlue: 20,
        White: 21,
        Heather: 22,
        Topaz: 23,
        DimGray: 24,
        SmokeyAsh: 25,
        Clairvoyant: 26,
        Red: 27,
        Mandy: 28,
        PinkPlum: 29,
        RainForest: 30,
        Stinger: 31
    },

    gfx: {

        clear: function(color){
            E.screen.fill(color, 0, 256*256);
        },

        pset: function (x, y, color) { //from colors array, 0-31
            x = x|0; y = y|0;

            if (x > -1 && x < 256 && y > -1 && y < 256) {
                ENGINE.screen[y * ENGINE.canvasWidth + x] = color;
            }
        },

        line: function (x1, y1, x2, y2, color) {

            x1 = x1|0;
            x2 = x2|0;
            y1 = y1|0;
            y2 = y2|0;

            var dy = (y2 - y1);
            var dx = (x2 - x1);
            var stepx, stepy;

            if (dy < 0) {
                dy = -dy;
                stepy = -1;
            } else {
                stepy = 1;
            }
            if (dx < 0) {
                dx = -dx;
                stepx = -1;
            } else {
                stepx = 1;
            }
            dy <<= 1;        // dy is now 2*dy
            dx <<= 1;        // dx is now 2*dx

            this.pset(x1, y1, color);
            if (dx > dy) {
                var fraction = dy - (dx >> 1);  // same as 2*dy - dx
                while (x1 != x2) {
                    if (fraction >= 0) {
                        y1 += stepy;
                        fraction -= dx;          // same as fraction -= 2*dx
                    }
                    x1 += stepx;
                    fraction += dy;              // same as fraction -= 2*dy
                    this.pset(x1, y1, color);
                }
                ;
            } else {
                fraction = dx - (dy >> 1);
                while (y1 != y2) {
                    if (fraction >= 0) {
                        x1 += stepx;
                        fraction -= dy;
                    }
                    y1 += stepy;
                    fraction += dx;
                    this.pset(x1, y1, color);
                }
            }

        },

        circle: function (xm, ym, r, color) {
            var x = -r, y = 0, err = 2 - 2 * r;
            /* II. Quadrant */
            do {


                this.pset(xm - x, ym + y, color);
                /*   I. Quadrant */
                this.pset(xm - y, ym - x, color);
                /*  II. Quadrant */
                this.pset(xm + x, ym - y, color);
                /* III. Quadrant */
                this.pset(xm + y, ym + x, color);
                /*  IV. Quadrant */
                r = err;
                if (r <= y) err += ++y * 2 + 1;
                /* e_xy+e_y < 0 */
                if (r > x || err > y) err += ++x * 2 + 1;
                /* e_xy+e_x > 0 or no 2nd y-step */
            } while (x < 0);
        },

        fillCircle: function (xm, ym, r, color) {
            xm = xm|0; ym = ym|0, r = r|0; color = color|0;
            var x = -r, y = 0, err = 2 - 2 * r;
            /* II. Quadrant */
            do {

                //this.line(xm-x, ym-y, xm+x, ym-y, color);
                //this.line(xm-x, ym+y, xm+x, ym+y, color);
                //var x1 = (xm-x), x2 = (xm + x), y1 = (ym-y), y2 = (ym+y);

                //console.log(y1 * ENGINE.canvasWidth + x1, ENGINE.canvasWidth + x2)
                ENGINE.screen.fill(color, (ym - y) * 256 + (xm + x), (ym - y) * 256 + (xm - x));
                ENGINE.screen.fill(color, (ym + y) * 256 + (xm + x), (ym + y) * 256 + (xm - x));
                r = err;
                if (r <= y) err += ++y * 2 + 1;
                /* e_xy+e_y < 0 */
                if (r > x || err > y) err += ++x * 2 + 1;
                /* e_xy+e_x > 0 or no 2nd y-step */
            } while (x < 0);
        },

        rect: function (x1, y1, x2, y2, color) {
            x1 = x1|0;
            x2 = x2|0;
            y1 = y1|0;
            y2 = y2|0;

            if(x1 > x2){ //we can't have this, it'll bork the fast .fill() stuff below.
                x1 = x1 ^ x2;
                x2 = x1 ^ x2;
                x1 = x1 ^ x2;  //XOR swap algorithm. https://en.wikipedia.org/wiki/XOR_swap_algorithm
            }

            //if(y1 > y2){
            //    y1 = y1 ^ y2;
            //    y2 = y1 ^ y2;
            //    y1 = y1 ^ y2;
            //}

            ENGINE.screen.fill(color, y1 * E.canvasWidth + x1, y1 * E.canvasWidth + x2);
            this.line(x2, y1, x2, y2, color);
            this.line(x1, y1, x1, y2, color);
            ENGINE.screen.fill(color, y2 * E.canvasWidth + x1, y2 * E.canvasWidth + x2);
        },

        fillRect: function (x1, y1, x2, y2, color) {

            x1 = x1|0;
            x2 = x2|0;
            y1 = y1|0;
            y2 = y2|0;

            if(x1 > x2){ //we can't have this, it'll bork the fast .fill() stuff below.
                x1 = x1 ^ x2;
                x2 = x1 ^ x2;
                x1 = x1 ^ x2;  //XOR swap algorithm. https://en.wikipedia.org/wiki/XOR_swap_algorithm
            }

            //if(y1 > y2){
            //    y1 = y1 ^ y2;
            //    y2 = y1 ^ y2;
            //    y1 = y1 ^ y2;
            //}

            var i = Math.abs(y2 - y1);
            //var colorhex = color;
            //line(x1, y1, x2, y1, color);
            E.screen.fill(color, y1 * E.canvasWidth + x1, y1 * E.canvasWidth + x2+1);

            //console.log(i);
            if(i > 0){
                while (--i) {
                    //line(x1, y1+i, x2, y1+i, color);
                    E.screen.fill(color, (y1 + i) * E.canvasWidth + x1, (y1 + i) * E.canvasWidth + x2+1)
                }
            }
            //console.log('exited while')

            //line(x1,y2, x2, y2, color);
            E.screen.fill(color, y2 * E.canvasWidth + x1, y2 * E.canvasWidth + x2+1);
        }

    },

    screenCapture: function () {

        var image = E.smallcanvas.toDataURL("image/png");

        window.open(image);

    },

    canvasInit: function () {


        E.canvas = document.getElementById('canvas');
        E.ctx = canvas.getContext('2d');
        E.ctx.imageSmoothingEnabled = false;
        E.ctx.mozImageSmoothingEnabled = false;

        E.smallcanvas = document.createElement('canvas');
        E.smallctx = E.smallcanvas.getContext('2d');
        E.smallcanvas.width = 256 | 0;
        E.smallcanvas.height = 256 | 0;
        E.canvasHeight = E.smallcanvas.height;
        E.canvasWidth = E.smallcanvas.width;
        E.imageData = E.smallctx.getImageData(0, 0, E.canvasWidth, E.canvasHeight);

        E.buf = new ArrayBuffer(E.imageData.data.length);
        E.buf8 = new Uint8ClampedArray(E.buf);
        E.data = new Uint32Array(E.buf);
        E.screen = new Uint8ClampedArray(E.imageData.data.length);
        E.ram = new Uint8ClampedArray(256*512);


    },

    render: function () {
        var i = E.data.length;
        while (i--) {
            E.data[i] = E.colors[E.screen[i]];
        }
        E.imageData.data.set(E.buf8);
        E.smallctx.putImageData(E.imageData, 0, 0);
        E.ctx.drawImage(E.smallcanvas, 0, 0, 255, 255, 0, 0, 767, 767);

    },

    post: function () {
        var i = E.screen.length;
        if (E.counter) {
            while (--i) {
                E.screen[i] = (E.screen[i] + 1) % 32;
            }
            E.counter = false;
        }

    },

    loop: function () {

        //console.log(E.counter)

        stats.begin();

        ENGINE.update();
        ENGINE.draw();

        stats.end();

        requestAnimationFrame(ENGINE.loop);
    },


}

var E = ENGINE;