halloween.ScoreController = function( app ) {
    this.initScore();

};

halloween.ScoreController.prototype.initScore = function() {
    var style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });

    var scoreText = new PIXI.Text('Score: 10000', style);
    scoreText.x = 200;
    scoreText.y = 50;

    app.stage.addChild(scoreText);
};