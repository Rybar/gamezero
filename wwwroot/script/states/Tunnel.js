/**
 * Created by ryan on 3/6/17.
 */
/**
 * Created by ryan on 3/3/17.
 */
ENGINE.Tunnel = {

    create: function() {
        E.t = 0;

        E.rings = [];

        let i = 40;
        while (--i){
            E.rings.push(
                {
                    x: 128,
                    y: 128,
                    dia: 181,
                    z: i,
                    offset: i,
                    color: 1
                }
            )
        }



        E.rings[26].color = 6;
        E.rings[25].color = 5;
        E.rings[24].color = 4;
        E.rings[23].color = 3;
        E.rings[22].color = 2;



        E.rings[6].color = 6;
        E.rings[5].color = 5;
        E.rings[4].color = 4;
        E.rings[3].color = 3;
        E.rings[2].color = 2;

    },
    
    resize: function() {
      E.canvas.width = window.innerWidth;
      E.canvas.height = window.innerHeight;
    },

    step: function(dt) {
        E.t += dt;
        //console.log('pre ring update');
        //let i = E.rings.length;
        for(var i = 0;i < E.rings.length; i++){
            E.rings[i].z -= dt * 10;
            E.rings[i].x = 128 + (Math.sin( (Math.PI*2/E.rings.length)*E.rings[i].offset ) * 20)|0;
            E.rings[i].y = 128 + (Math.cos( (Math.PI*2/E.rings.length)*E.rings[i].offset ) * 20)|0;
            if(E.rings[i].z < 1)E.rings[i].z = E.rings.length;
            //console.log('updating rings');

        }
        //console.log('post ring update');
    },

    mousemove: function(data) {

    },


    keydown: function(data) {
        if (data.key == 's') {
            console.log('key s pressed');
            ENGINE.switchState();
        }
    },

    render: function(dt) {

        E.renderTarget = E.page1;
        E.gfx.clear(0);

        for(var i = 0;i < E.rings.length; i++){
            if(E.rings[i].z > 0);
            E.gfx.circle(E.rings[i].x, E.rings[i].y, Math.floor( (E.rings[i].dia / E.rings[i].z) ), E.rings[i].color);
        }

        E.renderSource = E.page1;
        E.renderTarget = E.screen;

        for(var i = 0; i < 500; i++){

            let x = (Math.random()*256)|0;
            let y = (Math.random()*256)|0;
            let p = (y*256)+x;

            //E.gfx.rect(x-6, y-2, x+6, y+2, E.ram[E.page1+p]);
            E.gfx.line(x, y, 128, 128, E.ram[E.page1+p] );

        }
        for(var i = 0;i < E.rings.length; i++){
            if(E.rings[i].z > 0);
            E.gfx.circle(E.rings[i].x, E.rings[i].y, Math.floor( (E.rings[i].dia / E.rings[i].z) ), E.rings[i].color);
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
