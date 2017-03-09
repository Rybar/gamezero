var app = new PLAYGROUND.Application({

  smoothing: false,

  create: function() {

    /* things to preload */
    ENGINE.canvasInit();

    //ENGINE.app = this;

    //this.loadImage("giana");

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

