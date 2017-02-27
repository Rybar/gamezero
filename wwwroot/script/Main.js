var app = new PLAYGROUND.Application({

  smoothing: false,

  create: function() {

    /* things to preload */
    ENGINE.canvasInit();

    //this.loadImage("giana");

  },

  ready: function() {

    /* after preloading route events to the game state */

    this.setState(ENGINE.Game);

  }

});

