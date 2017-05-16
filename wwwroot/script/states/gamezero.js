/**
 * Created by ryan on 3/6/17.
 */
/**
 * Created by ryan on 3/3/17.
 */
ENGINE.gamezero = {

    create: function() {

        E.bgColor = 0;
        E.fgColor = 21;
        E.t = 0;

        E.renderTarget = E.page2;
        E.gfx.fillRect(0,0,256,256,2);
        E.gfx.checker(16,16,1);

        E.renderTarget = E.page3;
        E.gfx.fillRect(64,0,90,256,5);
        E.gfx.fillRect(66,0,88,256,3);


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

        E.gfx.circle(E.player.x, E.player.y, E.player.radius, 21);

        var i = 2000;
        while(i--){
            var x = (Math.random()*256)|0;
            var y = (Math.random()*256)|0;
            var color = E.ram[E.page1 + (y*256+x)];
            E.gfx.circle(x, y, 1, color-1);
        }
        //composite

        //our background was drawn to page2 in create()
        E.renderSource = E.page2;
        //reset the render target to screen
        E.renderTarget = E.screen;
        //draw it!
        E.gfx.spr(0,0,256,256,0,0);

        //our foreground stuff is on page1
        E.renderSource = E.page1;
        E.gfx.spr(0,0,256,256,0,0);

        //our foreground stuff is on page3
        E.renderSource = E.page3;
        E.gfx.spr(0,0,256,256,0,0);

        E.render();

    },



}
