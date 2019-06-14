var halloween = halloween || {};
var postition = 0;
var fantasma;

halloween.ElementsController = function( app ) {
    var that = this;
    this.view = new halloween.ElementsView(app);
    this.player = PIXI.loader.add('fantasma', 'image/obstaculos/fantasma.json')
        .load(function(){
            that.initCharacter(arguments);
        });
};

halloween.ElementsController.prototype.configElement = function(){
    var that = this;
    this.view = new halloween.ElementsView(app);
    this.player = PIXI.loader.add('fantasma', 'image/obstaculos/fantasma.json')
        .load(function(){
            that.initCharacter(arguments);
        });
}

halloween.ElementsController.prototype.initCharacter = function(args) {
    var that = this;
    fantasma = new PIXI.spine.Spine( args[1].fantasma.spineData );
    app.stage.addChild(fantasma);

    fantasma.x = app.renderer.width * 0.15;
    fantasma.y = app.renderer.height * 0.6;

    if(fantasma){
        this.view.initView( fantasma );
        this.view.animateIdle();
    }

    app.stage.on('click', function() {
        that.view.animateSaltoAlto();
    });
    this.launchTicker();
};