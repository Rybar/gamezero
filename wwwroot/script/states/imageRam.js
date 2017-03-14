/**
 * Created by ryan on 3/6/17.
 */
/**
 * Created by ryan on 3/3/17.
 */
ENGINE.ImageRam = {



    create: function() {


        E.cursor = {
            x: 0,
            y: 0
        };

        E.imagetoRam(this.app.images.spritefont, E.page1);
        console.log(E.ram[E.page1 + 10])
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

        if (data.key == 'm') {
            ENGINE.memoryCapture();
        }

    },

    render: function(dt) {

        //E.gfx.clear(1);

        var i = 0x10000;
        while(i--){
                E.ram[0x10000 - i] = E.ram[0x20000 - i]
            }


        this.makeColorBar();

        E.render();

    },

    makeColorBar: function(){
        for(var i = 0; i<32; i++) {
            E.gfx.fillRect(i*8, 0, (i*8)+8, 8, i);
        }
    }

}
