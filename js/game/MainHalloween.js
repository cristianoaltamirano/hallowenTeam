/**
 * Halloween Main
 * @type {Application}
 */
const app = new PIXI.Application();

function initHalloweenApp() {
    document.body.appendChild(app.view);
    app.stop();
}

function AppHalloween() {
    return app;
}