var halloween = halloween || {};
var postition = 0;
var background;
var background2;
var foreground;
var foreground2;
var BACKGROUND_WIDTH = 2743;

halloween.BackgroundController = function( app ) {
    this.initBackground();

};

halloween.BackgroundController.prototype.initBackground = function() {
    var container = new PIXI.Container();
    app.stage.addChild(container);

    background = PIXI.Sprite.fromImage('image/background/fondo_mergeado.png');
    background2 = PIXI.Sprite.fromImage('image/background/fondo_mergeado.png');
    foreground = PIXI.Sprite.fromImage(''/*'image/background/piso.png'*/);
    foreground2 = PIXI.Sprite.fromImage(''/*'image/background/piso.png'*/);
    foreground.anchor.set(0, 1);
    foreground.position.y = app.screen.height;
    foreground2.anchor.set(0, 1);
    foreground2.position.y = app.screen.height;

    container.addChild(background, background2, foreground, foreground2);
    //container.width = 500;
    container.height = 500;
    //app.start();
    this.launchTicker();
};

halloween.BackgroundController.prototype.launchTicker = function() {
    app.ticker.add(function() {
        postition += 10;

        background.x = -(postition * 0.6);
        background.x %= BACKGROUND_WIDTH * 2;
        if (background.x < 0) {
            background.x += BACKGROUND_WIDTH * 2;
        }
        background.x -= BACKGROUND_WIDTH;

        background2.x = -(postition * 0.6) + BACKGROUND_WIDTH;
        background2.x %= BACKGROUND_WIDTH * 2;
        if (background2.x < 0) {
            background2.x += BACKGROUND_WIDTH * 2;
        }
        background2.x -= BACKGROUND_WIDTH;

        foreground.x = -postition;
        foreground.x %= BACKGROUND_WIDTH * 2;
        if (foreground.x < 0) {
            foreground.x += BACKGROUND_WIDTH * 2;
        }
        foreground.x -= BACKGROUND_WIDTH;

        foreground2.x = -postition + BACKGROUND_WIDTH;
        foreground2.x %= BACKGROUND_WIDTH * 2;
        if (foreground2.x < 0) {
            foreground2.x += BACKGROUND_WIDTH * 2;
        }
        foreground2.x -= BACKGROUND_WIDTH;
    });
};

