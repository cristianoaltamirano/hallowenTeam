var halloween = halloween || {};

halloween.CharacterView = function( app ) {
    this.player = null;
}

halloween.CharacterView.prototype.initView = function(player) {
    this.player = player;
};

halloween.CharacterView.prototype.animateDaño = function() {
    this.player.state.setAnimation(0, "daño", false, 0);
    this.vibrateDevice(2000);
};

halloween.CharacterView.prototype.animateIdle = function() {
    this.player.state.setAnimation(0, "idle", true, 0);
};

halloween.CharacterView.prototype.animateSaltoAlto = function() {
    this.player.state.setAnimation(0, "salto_alto", false, 0);
    this.vibrateDevice(2000);
};

halloween.CharacterView.prototype.animateSaltoBajo = function() {
    this.player.state.setAnimation(0, "salto_bajo", false, 0);
};

halloween.CharacterView.prototype.animateMuerte = function() {
    this.player.state.addAnimation(0, "muerte", false, 0);
};

halloween.CharacterView.prototype.vibrateDevice = function(time){

    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if(navigator.vibrate){
        navigator.vibrate(time);
    }
}