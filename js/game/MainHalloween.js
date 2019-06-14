/**
 * Halloween Main
 * @type {Application}
 */

var halloween = halloween || {};

var app = new PIXI.Application();

halloween.initHalloweenApp = function () {
    var renderer    = PIXI.autoDetectRenderer(window.screen.width, window.screen.height);
    app.renderer = renderer;
    app.start();
    
    document.body.appendChild(app.view);


    new halloween.characterController(app);
    new halloween.BackgroundController(app);
};

halloween.AppHalloween = function AppHalloween() {
    return app;
};