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
    var that = this;
    var player = new PIXI.spine.Spine( args[1].player.spineData );
    app.stage.addChild(player);
    
    player.x = app.renderer.width * 0.15;
    player.y = app.renderer.height * 0.6;

      if(player){
        this.view.initView( player );
        this.view.animateIdle();
      }    

      app.stage.on('click', function() {
        that.view.animateSaltoAlto();        
    });
};
