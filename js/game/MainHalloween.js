/**
 * Halloween Main
 * @type {Application}
 */

var halloween = halloween || {};
var banderaElement = false;

var app = new PIXI.Application();

halloween.initHalloweenApp = function () {
    var renderer    = PIXI.autoDetectRenderer(window.screen.width, window.screen.height);
    app.renderer = renderer;
    app.start();
    
    document.body.appendChild(app.view);


    new halloween.CharacterController(app);

    new halloween.BackgroundController(app);
    new halloween.ScoreController(app);

};

halloween.AppHalloween = function AppHalloween() {
    return app;
};