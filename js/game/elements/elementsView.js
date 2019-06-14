var halloween = halloween || {};

halloween.ElementsView = function( app ) {
    this.fantasma = null;
}

halloween.ElementsView.prototype.initView = function(fantasma) {
    this.fantasma = fantasma;
    //this.fantasma.x = 500;
    this.launchTicker();
};

halloween.ElementsView.prototype.animateDaño = function() {
    this.fantasma.state.addAnimation(0, "daño", false, 0);
};

halloween.ElementsView.prototype.animateIdle = function() {
    this.fantasma.state.addAnimation(0, "idle", true, 0);
};

halloween.ElementsView.prototype.animateSaltoAlto = function() {
    this.fantasma.state.addAnimation(0, "salto_alto", false, 0);
};

halloween.ElementsView.prototype.animateSaltoBajo = function() {
    this.fantasma.state.addAnimation(0, "salto_bajo", false, 0);
};

halloween.ElementsView.prototype.animateMuerte = function() {
    this.fantasma.state.addAnimation(0, "muerte", false, 0);
};

halloween.ElementsView.prototype.launchTicker = function() {
    let fantasma = this.fantasma;
    app.ticker.add(function() {
        postition += 10;

        fantasma.x = -(postition * 0.6);
        fantasma.x %= 2743 * 2;
        if (fantasma.x < 0) {
            fantasma.x += 2743 * 2;
        }
        fantasma.x -= 2743;
    });
};