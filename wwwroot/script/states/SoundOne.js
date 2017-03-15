/**
 * Created by ryan on 3/6/17.
 */
/**
 * Created by ryan on 3/3/17.
 */
ENGINE.SoundOne = {

    create: function() {

        E.cursor = {
            x: 0,
            y: 0
        };
    },

    step: function(dt) {
        E.t += dt;
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

    render: function(dt) {

        E.gfx.clear(1);


        this.makeColorBar();

        E.gfx.circle(E.cursor.x, E.cursor.y, 1, 21);

        E.render();

    },

    touchend: function(data){
        ENGINE.switchState();
    },

    makeColorBar: function(){
        for(var i = 0; i<32; i++) {
            E.gfx.fillRect(i*8, 0, (i*8)+8, 8, i);
        }
    }

}
