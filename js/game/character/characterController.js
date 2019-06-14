var halloween = halloween || {};

halloween.CharacterController = function( app ) {
    
    var that = this;
    this.view = new halloween.CharacterView(app);
    this.player = PIXI.loader.add('player', 'image/player/player.json')
                             .load(function(){
                                that.initCharacter(arguments);
                             }); 
}

halloween.CharacterController.prototype.initCharacter = function(args) {
    new halloween.ElementsController(app);
    var that = this;
    var player = new PIXI.spine.Spine( args[1].player.spineData );

    app.stage.addChild(player);
    app.stage.interactive = true;
    
    player.x = app.renderer.width * 0.15;
    player.y = app.renderer.height * 0.6;
    player.interactive = true;

      if(player){
        this.view.initView( player );
        this.view.animateIdle();
      }    

      player.on('click', function() {
        that.view.animateSaltoAlto();        
    });
};
