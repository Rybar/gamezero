/**
 * Created by ryan on 3/6/17.
 */
/**
 * Created by ryan on 3/3/17.
 */
ENGINE.Life = {

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

    touchend: function(data){
        ENGINE.switchState();
    },

   enter: function() {
        var i = 256;
        while(--i){
            E.gfx.pset(i,0, Math.floor(Math.random()*2))
        }
    },


    render: function(dt) {


        //E.gfx.clear(1);

        E.ram.copyWithin(256, 0, 0x10000);

        E.gfx.line(0,0,255,0,0);

        for(var x = 0; x < 256; x++){
            let k = 0;

            k += E.ram[256+x-1];
            k += E.ram[256+x+1];

            if(k==1) E.gfx.pset(x,0,(k)%2)
        }




        //this.makeColorBar();

        E.render();

    },

    makeColorBar: function(){
        for(var i = 0; i<32; i++) {
            E.gfx.fillRect(i*8, 0, (i*8)+8, 8, i);
        }
    }

}
