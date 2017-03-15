var app = new PLAYGROUND.Application({

  smoothing: false,

  preload: function() {

    this.loadImage('spritefont');
    console.log(this.images);


  },

  create: function() {

    /* things to preload */
    ENGINE.canvasInit();

    //ENGINE.app = this;

    //this.loadImage("giana");

    var audioContext = new(window.AudioContext || window.webkitAudioContext);

  },

  ready: function() {

    /* after preloading route events to the game state */

    this.setState(ENGINE.states[0])
  }

});
var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

app.on("step", function() { 
  
  stats.begin();
  
});

app.on("afterpostrender", function() {

  stats.end();

});

