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

    resize: function() {
      E.canvas.width = window.innerWidth;
      E.canvas.height = window.innerHeight;
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
    keyup: function(data) {
        if (data.key == 'n'){

            if(E.playing){
                E.osc.stop();
                E.playing = false;
            }
            else{
                this.playSound();
                E.playing = true;
            }

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
    },

    playSound: function(){
        E.osc = E.audioContext.createOscillator();
        E.gain = E.audioContext.createGain();

        E.osc.type = 'triangle';
        E.osc.frequency = 440;
        E.gain.gain.value = .5;

        E.gain.connect(E.audioContext.destination)
        E.osc.connect(E.gain);

        E.osc.start();
    }

}
