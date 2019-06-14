var halloween = halloween || {};

halloween.characterController = function( app ) {
    
    this.player = null;
    PIXI.loader
        .add('player', 'image/player/player.json')
        .load(this.initCharacter); 
}

halloween.characterController.prototype.initCharacter = function(loader, res) {
    this.player = new PIXI.spine.Spine(res.player.spineData );
    app.stage.addChild(this.player);
};
