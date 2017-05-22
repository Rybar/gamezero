/**
 * Created by ryan on 3/6/17.
 */
/**
 * Created by ryan on 3/3/17.
 */
ENGINE.gamezero = {

    create: function() {

      E.triangles = [];
      for(var i = 0; i < 2000; i++){
        let ox = (Math.random() * 255)|0;
        let oy = (Math.random() * 255)|0;
        let rad = 15;
        E.triangles.push({
          x1: ox + (Math.random() * rad * 2) - rad,
          y1: oy + (Math.random() * rad * 2) - rad,
          x2: ox + (Math.random() * rad * 2) - rad,
          y2: oy + (Math.random() * rad * 2) - rad,
          x3: ox + (Math.random() * rad * 2) - rad,
          y3: oy + (Math.random() * rad * 2) - rad,
          color: (Math.random() * 31)|0,
        })
      }
      console.log(E.triangles.length);

      E.twoColorPalette = [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1];
      E.inversePalette = E.palDefault.slice().reverse();
      E.warmPalette = [14,0,14,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7];


        E.bgColor = 0;
        E.fgColor = 21;
        E.t = 0;
        E.moveX = 0;

        E.renderTarget = E.page2;
        E.gfx.fillRect(0,0,256,256,2);
        E.gfx.checker(16,16,1);
        //E.gfx.fillCircle(64,64,17,21);


        // E.renderTarget = E.page3;
        // E.gfx.fillRect(64,0,90,256,5);
        // E.gfx.fillRect(66,0,88,256,3);


        //E.gfx.fillRect(0,0,256,256,2);

        E.player = {
          x: 128,
          y: 128,
          radius: 10,
          xvel: 0,
          yvel: 0,
          speed: 6

        }

        E.drag = .97;

        E.cursor = {
            x: 0,
            y: 0
        };
    },

    resize: function() {
      E.canvas.width = window.innerWidth;
      E.canvas.height = window.innerHeight;
    },

    step: function(dt) {
        E.t += dt;

        E.cos = Math.cos(dt);
        E.sin = Math.sin(dt);

        for(var i = 0; i < E.triangles.length; i++){

            var tri = E.triangles[i],

            dx1 = tri.x1 + -128,
            dx2 = tri.x2 + -128,
            dx3 = tri.x3 + -128,
            dy1 = tri.y1 + -128,
            dy2 = tri.y2 + -128,
            dy3 = tri.y3 + -128;

            E.triangles[i].x1 = E.cos * dx1 - E.sin * dy1 + 128;
            E.triangles[i].y1 = E.sin * dx1 + E.cos * dy1 + 128;
            E.triangles[i].x2 = E.cos * dx2 - E.sin * dy2 + 128;
            E.triangles[i].y2 = E.sin * dx2 + E.cos * dy2 + 128;
            E.triangles[i].x3 = E.cos * dx3 - E.sin * dy3 + 128;
            E.triangles[i].y3 = E.sin * dx3 + E.cos * dy3 + 128;
        };

        E.player.x += dt * E.player.xvel;
        E.player.y += dt * E.player.yvel;
        E.player.xvel *= E.drag;
        E.player.yvel *= E.drag;

        //player movement
        if (this.app.keyboard.keys.a) {
            E.player.xvel -=E.player.speed;
        }
        if (this.app.keyboard.keys.d){
            E.player.xvel +=E.player.speed;
        }
        if(this.app.keyboard.keys.w){
          E.player.yvel -=E.player.speed;
        }
        if(this.app.keyboard.keys.s) {
          E.player.yvel +=E.player.speed;
        }
        //end player movement

        //world wrap for player
        if(E.player.x > 256+E.player.radius*2){
          E.player.x = -E.player.radius
        }
        if(E.player.x < 0-E.player.radius*2){
          E.player.x = 256+E.player.radius
        }
        if(E.player.y > 256+E.player.radius*2){
          E.player.y = -E.player.radius
        }
        if(E.player.y < 0-E.player.radius*2){
          E.player.y = 256+E.player.radius
        }
        //end world wrap for player
    },

    mousemove: function(data) {

        var rect = E.canvas.getBoundingClientRect();
        E.cursor.x = ( ( (data.x - rect.left)/3) |0 );
        E.cursor.y = ( ( (data.y - rect.top) /3) |0 );

    },


    keydown: function(data) {

    },


    render: function(dt) {

        E.renderTarget = E.page1;
        E.gfx.fillRect(0,0,256,256,0);
        for(var i = 0; i < E.triangles.length; i++){

            E.gfx.fillTriangle(
              E.triangles[i].x1,
              E.triangles[i].y1,
              E.triangles[i].x2,
              E.triangles[i].y2,
              E.triangles[i].x3,
              E.triangles[i].y3,
              E.triangles[i].color
            )
          }
        //E.pal = [0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0]

        E.gfx.circle(E.player.x, E.player.y, E.player.radius, 21);

        // var i = 5000;
        // while(i--){
        //     var x = (Math.random()*256)|0;
        //     var y = (Math.random()*256)|0;
        //     var color = E.ram[E.page1 + (y*256+x)];
        //     E.gfx.circle(x, y, 1, color-1);
        // }
        //composite

        //our background was drawn to page2 in create()
        E.renderSource = E.page2;
        //reset the render target to screen
        E.renderTarget = E.page4;
        //draw it!
        E.gfx.spr(0,0,256,256,0,0);

        //our foreground stuff is on page1
        E.renderSource = E.page1;
        E.gfx.spr(0,0,256,256,0,0);

        E.renderSource = E.page4;
        E.renderTarget = E.screen;
        E.gfx.spr(0,0,256,256);


        E.pal = E.warmPalette;
        E.moveX = (Math.sin(E.t)*64)|0;
        E.gfx.spr(64,64, 128,128, 64,64);

        E.pal = E.twoColorPalette;
        E.gfx.spr(0,0,64,64);
        E.gfx.spr(0,64*3, 64, 256, 0, 64*3);
        E.gfx.spr(64*3, 64*3, 256, 256, 64*3, 64*3);
        E.gfx.spr(127+64,0, 256,64, 127+64,0)

        E.pal = E.palDefault;

        E.render();

    },



}
