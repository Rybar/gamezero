ENGINE = {
    E: this,


    /*
     screen memory

     each px:

     000 /flags? 00000 /color -32 color index
     */

    screen: 0x00000,
    page1: 0x10000,
    page2: 0x20000,
    page3: 0x30000,
    page4: 0x40000,
    page5: 0x50000,
    page6: 0x60000,
    page7: 0x70000,

    //DB32 Palette
    colors: [0xff000000, 0xff342022, 0xff3c2845, 0xff313966, 0xff3b568f, 0xff2671df, 0xff66a0d9, 0xff9ac3ee, 0xff36f2fb,
        0xff50e599, 0xff30be6a, 0xff6e9437, 0xff2f694b, 0xff244b52, 0xff393c32, 0xff743f3f, 0xff826030, 0xffe16e5b,
        0xffff9b63, 0xffe4cd5f, 0xfffcdbcb, 0xffffffff, 0xffb7ad9b, 0xff877e84, 0xff6a6a69, 0xff525659, 0xff8a4276,
        0xff3232ac, 0xff6357d9, 0xffba7bd7, 0xff4a978f, 0xff306f8a],

    brightness: [0,1,2,14,3,15,13,27,26,25,16,4,12,24,31,28,17,23,11,5,30,29,18,6,10,22,19,7,9,20,8,21],

    palDefault: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],

    pal: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],

    renderTarget: 0x00000,

    renderSource: 0x10000,

    currentState: 0,

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
            E.ram.fill(color, E.renderTarget, E.renderTarget + 0x10000);
        },

        pset: function (x, y, color) { //from colors array, 0-31
            x = x|0; y = y|0;
            //color = Math.max(0, Math.min(color, 31))|0;

            if (x > -1 && x < 256 && y > -1 && y < 256) {
                E.ram[E.renderTarget + (y * 256 + x)] = color;
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
                this.line(xm-x, ym-y, xm+x, ym-y, color);
                this.line(xm-x, ym+y, xm+x, ym+y, color);
                r = err;
                if (r <= y) err += ++y * 2 + 1;
                if (r > x || err > y) err += ++x * 2 + 1;
            } while (x < 0);
        },

        rect: function (x1, y1, x2, y2, color) {
            x1 = x1|0;
            x2 = x2|0;
            y1 = y1|0;
            y2 = y2|0;


            this.line(x1,y1, x2, y1, color);
            this.line(x2, y1, x2, y2, color);
            this.line(x1, y2, x2, y2, color);
            this.line(x1, y1, x1, y2, color);
        },

        fillRect: function (x1, y1, x2, y2, color) {

            x1 = x1|0;
            x2 = x2|0;
            y1 = y1|0;
            y2 = y2|0;

            var i = Math.abs(y2 - y1);
            E.gfx.line(x1, y1, x2, y1, color);

            if(i > 0){
                while (--i) {
                    E.gfx.line(x1, y1+i, x2, y1+i, color);
                }
            }

            E.gfx.line(x1,y2, x2, y2, color);
        },

        triangle: function (x1, y1, x2, y2, x3, y3, color) {
          E.gfx.line(x1,y1, x2,y2, color);
          E.gfx.line(x2,y2, x3,y3, color);
          E.gfx.line(x3,y3, x1,y1, color);
        },

        fillTriangle: function( x1, y1, x2, y2, x3, y3, color ) {

          var canvasWidth = 256;
          // http://devmaster.net/forums/topic/1145-advanced-rasterization/
          // 28.4 fixed-point coordinates
          var x1 = Math.round( 16 * x1 );
          var x2 = Math.round( 16 * x2 );
          var x3 = Math.round( 16 * x3 );
          var y1 = Math.round( 16 * y1 );
          var y2 = Math.round( 16 * y2 );
          var y3 = Math.round( 16 * y3 );
          // Deltas
          var dx12 = x1 - x2, dy12 = y2 - y1;
          var dx23 = x2 - x3, dy23 = y3 - y2;
          var dx31 = x3 - x1, dy31 = y1 - y3;
          // Bounding rectangle
          var minx = Math.max( ( Math.min( x1, x2, x3 ) + 0xf ) >> 4, 0 );
          var maxx = Math.min( ( Math.max( x1, x2, x3 ) + 0xf ) >> 4, 256 );
          var miny = Math.max( ( Math.min( y1, y2, y3 ) + 0xf ) >> 4, 0 );
          var maxy = Math.min( ( Math.max( y1, y2, y3 ) + 0xf ) >> 4, 256 );
          // Block size, standard 8x8 (must be power of two)
          var q = 8;
          // Start in corner of 8x8 block
          minx &= ~(q - 1);
          miny &= ~(q - 1);
          // Constant part of half-edge functions
          var c1 = -dy12 * x1 - dx12 * y1;
          var c2 = -dy23 * x2 - dx23 * y2;
          var c3 = -dy31 * x3 - dx31 * y3;
          // Correct for fill convention
          if ( dy12 > 0 || ( dy12 == 0 && dx12 > 0 ) ) c1 ++;
          if ( dy23 > 0 || ( dy23 == 0 && dx23 > 0 ) ) c2 ++;
          if ( dy31 > 0 || ( dy31 == 0 && dx31 > 0 ) ) c3 ++;
          // Note this doesn't kill subpixel precision, but only because we test for >=0 (not >0).
          // It's a bit subtle. :)
          c1 = (c1 - 1) >> 4;
          c2 = (c2 - 1) >> 4;
          c3 = (c3 - 1) >> 4;
          // Set up min/max corners
          var qm1 = q - 1; // for convenience
          var nmin1 = 0, nmax1 = 0;
          var nmin2 = 0, nmax2 = 0;
          var nmin3 = 0, nmax3 = 0;
          if (dx12 >= 0) nmax1 -= qm1*dx12; else nmin1 -= qm1*dx12;
          if (dy12 >= 0) nmax1 -= qm1*dy12; else nmin1 -= qm1*dy12;
          if (dx23 >= 0) nmax2 -= qm1*dx23; else nmin2 -= qm1*dx23;
          if (dy23 >= 0) nmax2 -= qm1*dy23; else nmin2 -= qm1*dy23;
          if (dx31 >= 0) nmax3 -= qm1*dx31; else nmin3 -= qm1*dx31;
          if (dy31 >= 0) nmax3 -= qm1*dy31; else nmin3 -= qm1*dy31;
          // Loop through blocks
          var linestep = (canvasWidth-q);
          for ( var y0 = miny; y0 < maxy; y0 += q ) {
            for ( var x0 = minx; x0 < maxx; x0 += q ) {
              // Edge functions at top-left corner
              var cy1 = c1 + dx12 * y0 + dy12 * x0;
              var cy2 = c2 + dx23 * y0 + dy23 * x0;
              var cy3 = c3 + dx31 * y0 + dy31 * x0;
              // Skip block when at least one edge completely out
              if (cy1 < nmax1 || cy2 < nmax2 || cy3 < nmax3) continue;
              // Offset at top-left corner
              var offset = (x0 + y0 * canvasWidth);
              // Accept whole block when fully covered
              if (cy1 >= nmin1 && cy2 >= nmin2 && cy3 >= nmin3) {
                for ( var iy = 0; iy < q; iy ++ ) {
                  for ( var ix = 0; ix < q; ix ++, offset ++ ) {
                    E.ram[E.renderTarget + offset] = color;
                  }
                  offset += linestep;
                }
              } else { // Partially covered block
                for ( var iy = 0; iy < q; iy ++ ) {
                  var cx1 = cy1;
                  var cx2 = cy2;
                  var cx3 = cy3;
                  for ( var ix = 0; ix < q; ix ++ ) {
                    if ( (cx1 | cx2 | cx3) >= 0 ) {
                      E.ram[E.renderTarget + offset] = color;
                    }
                    cx1 += dy12;
                    cx2 += dy23;
                    cx3 += dy31;
                    offset ++;
                  }
                  cy1 += dx12;
                  cy2 += dx23;
                  cy3 += dx31;
                  offset += linestep;
                }
              }
            }
          }
        },

        spr: function(sx = 0, sy = 0, sw = 16, sh = 16, x=0, y=0, flipx = false, flipy = false){


                for(var i = 0; i < sh; i++){

                    for(var j = 0; j < sw; j++){

                        if(y+i < 255 && x+j < 255 && y+i > -1 && x+j > -1){
                            if(flipx & flipy){

                                if(E.ram[(E.renderSource + ( ( sy + (sh-i) )*256+sx+(sw-j)))] > 0) {

                                //E.ram[ (E.renderTarget + ((y+i)*256+x+j)) ] = 21;

                                E.ram[ (E.renderTarget + ((y+i)*256+x+j)) ] = E.pal[ E.ram[(E.renderSource + ((sy+(sh-i))*256+sx+(sw-j)))] ];

                                }

                            }
                            else if(flipy && !flipx){

                                if(E.ram[(E.renderSource + ( ( sy + (sh-i) )*256+sx+j))] > 0) {

                                E.ram[ (E.renderTarget + ((y+i)*256+x+j)) ] = E.ram[(E.renderSource + ((sy+(sh-i))*256+sx+j))];

                                }

                            }
                            else if(flipx && !flipy){

                                if(E.ram[(E.renderSource + ((sy+i)*256+sx+(sw-j)))] > 0) {

                                E.ram[ (E.renderTarget + ((y+i)*256+x+j)) ] = E.ram[(E.renderSource + ((sy+i)*256+sx+(sw-j)))];

                                }

                            }
                            else if(!flipx && !flipy){

                                if(E.ram[(E.renderSource + ((sy+i)*256+sx+j))] > 0) {

                                E.ram[ (E.renderTarget + ((y+i)*256+x+j)) ] = E.pal[ E.ram[(E.renderSource + ((sy+i)*256+sx+j))] ];

                                }

                            }
                        }
                    }
                }
        },

        sspr: function(sx = 0, sy = 0, sw = 16, sh = 16, x=0, y=0, dw=16, dh=16, flipx = false, flipy = false){

            var xratio = sw / dw;
            var yratio = sh / dh;

            for(var i = 0; i < dh; i++){
                for(var j = 0; j < dw; j++){

                    px = (j*xratio)|0;
                    py = (i*yratio)|0;

                    if(y+i < 255 && x+j < 255 && y+i > -1 && x+j > -1) {
                        if (E.ram[(E.renderSource + ((sy + py) * 256 + sx + px))] > 0) {
                            E.ram[(E.renderTarget + ((y + i) * 256 + x + j))] = E.ram[(E.renderSource + ((sy + py) * 256 + sx + px))]
                        }
                    }

                }
            }


        },

        checker: function(nRow, nCol, color) {
          var w = 256;
          var h = 256;
          var x = 0;
          var y = 0;

          nRow = nRow || 8;    // default number of rows
          nCol = nCol || 8;    // default number of columns

          w /= nCol;            // width of a block
          h /= nRow;            // height of a block

          for (var i = 0; i < nRow; ++i) {
              for (var j = 0, col = nCol / 2; j < col; ++j) {
                x = 2 * j * w + (i % 2 ? 0 : w);
                y = i * h;
                  E.gfx.fillRect(x, y, x+w, y+h, color);
              }
          }
        }
    },

    UIObject: {
        intersects: function(obj, mouse) {
            var t = 5; //tolerance
            var xIntersect = (mouse.x + t) > obj.x && (mouse.x - t) < obj.x + obj.width;
            var yIntersect = (mouse.y + t) > obj.y && (mouse.y - t) < obj.y + obj.height;
            return  xIntersect && yIntersect;
        },
        updateStats: function(canvas){
            if (this.intersects(this, canvas.mouse)) {
                this.hovered = true;
                if (canvas.mouse.clicked) {
                    this.clicked = true;
                }
            } else {
                this.hovered = false;
            }

            if (!canvas.mouse.down) {
                this.clicked = false;
            }
        }
    },

    imagetoRam: function(image, address) {

        let tempCanvas = document.createElement('canvas');
        tempCanvas.width = 256;
        tempCanvas.height = 256;
        let context = tempCanvas.getContext('2d');
        //draw image to canvas
        context.drawImage(image, 0, 0);

        //get image data
        var imageData = context.getImageData(0,0, 256, 256);

        //set up 32bit view of buffer
        let data = new Uint32Array(imageData.data.buffer);

        //compare buffer to palette (loop)
        for(var i = 0; i < data.length; i++) {
            //set ram to color index
            E.ram[address + i] = E.colors.indexOf(data[i]);
            //console.log(data[i]);
        }


    },

    screenCapture: function (canvas) {

        var image = canvas.toDataURL("image/png");

        window.open(image);

    },

    memoryCapture: function () {

        console.log(E.ram);

        //var tmpcanvas = document.createElement('canvas');
        //var ctx = tmpcanvas.getContext('2d');
        //tmpcanvas.width = 256;
        //tmpcanvas.height = 256;
        //var ramimage = ctx.getImageData(0,0, 256, 256);
        //
        //
        //var buf = new ArrayBuffer(ramimage.data.length);
        //console.log(ramimage.data.length, E.ram.length);
        ////var buf8 = new Uint8ClampedArray(buf);
        //var data = new Uint32Array(buf);
        //
        //ramimage.data.set(E.ram);
        //ctx.putImageData(ramimage, 0,0);
        //console.log(ramimage);
        //var ramcapture = tmpcanvas.toDataURL("image/png");
        //window.open(ramcapture);

    },

    canvasInit: function () {

        E.canvas = document.getElementById('canvas');
        E.ctx = canvas.getContext('2d');
        E.canvas.width = window.innerWidth;
        E.canvas.height = window.innerHeight;
        E.ctx.imageSmoothingEnabled = false;
        E.ctx.mozImageSmoothingEnabled = false;

        E.smallcanvas = document.createElement('canvas');
        E.smallctx = E.smallcanvas.getContext('2d');
        E.smallcanvas.width = 256;
        E.smallcanvas.height = 256;
        E.canvasHeight = E.smallcanvas.height;
        E.canvasWidth = E.smallcanvas.width;
        E.imageData = E.smallctx.getImageData(0, 0, E.canvasWidth, E.canvasHeight);

        E.buf = new ArrayBuffer(E.imageData.data.length);
        E.buf8 = new Uint8ClampedArray(E.buf);
        E.data = new Uint32Array(E.buf);
       // console.log(E.buf.length, E.buf8.length, E.data.length);
        E.ram = new Uint8ClampedArray(0x80000);

        E.renderTarget = E.screen;



    },

    render: function () {

        var i = 0x10000;  // display is first 0x10000 bytes of ram

        while (i--) {
            E.data[i] = E.colors[E.pal[E.ram[i]]]; //data is 32bit view of final screen buffer

        }

        E.imageData.data.set(E.buf8);

        E.smallctx.putImageData(E.imageData, 0, 0);
        //E.ctx.putImageData(E.imageData, 0, 0);

        //E.ctx.drawImage(E.smallcanvas, 0, 0);
        E.compositeSize = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
        E.compositeOrigin = ( (window.innerWidth - E.compositeSize)/2)|0;
        E.ctx.imageSmoothingEnabled = false;
        E.ctx.mozImageSmoothingEnabled = false;

        E.ctx.drawImage(E.smallcanvas, 0, 0, 255, 255, E.compositeOrigin, 0, E.compositeSize, E.compositeSize);



    },

    switchState: function(state) {

            E.currentState += 1;
            if(E.currentState > E.states.length-1){
                E.currentState = 0;
            }
            app.setState(E.states[E.currentState]);

    }


}

var E = ENGINE;

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
