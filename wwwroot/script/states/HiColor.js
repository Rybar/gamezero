/**
 * Created by ryan on 3/6/17.
 */
/**
 * Created by ryan on 3/3/17.
 */
ENGINE.HiColor = {

    create: function() {

        E.cursor = {
            x: 0,
            y: 0
        };

        E.flip = true;
    },

    resize: function() {
      E.canvas.width = window.innerWidth;
      E.canvas.height = window.innerHeight;
    },

    step: function(dt) {
        E.t += dt;
        E.flip = !E.flip;
    },

    mousemove: function(data) {

        var rect = E.canvas.getBoundingClientRect();
        E.cursor.x = ( ( (data.x - rect.left)/3) |0 );
        E.cursor.y = ( ( (data.y - rect.top) /3) |0 );

    },


    keydown: function(data) {
        if (data.key == 's') {
            ENGINE.switchState();
        }
    },

    touchend: function(data){
        ENGINE.switchState();
    },


    render: function(dt) {

        E.renderTarget = E.screen;

        //E.gfx.clear(21);
        for(var i = 0; i<32; i++) {
            E.gfx.fillRect(i*8, 0, (i*8)+8, 256, i);
        }

        if(E.flip){
          for(var i = 0; i<32; i++) {
              E.gfx.fillRect(0, i*8, 256, (i*8)+8, i);
          }  
        }

        E.render();

    },

    makeColorBar: function(){
        for(var i = 0; i<32; i++) {
            E.gfx.fillRect(i*8, 0, (i*8)+8, 8, i);
        }
    }

}
