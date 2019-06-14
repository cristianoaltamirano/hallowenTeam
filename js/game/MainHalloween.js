/**
 * Halloween Main
 * @type {Application}
 */

var AppHallowen = AppHallowen || {};

const app = new PIXI.Application();

AppHallowen.initHalloweenApp = function () {
    document.body.appendChild(app.view);
    app.stop();
};

AppHallowen.AppHalloween = function AppHalloween() {
    return app;
};