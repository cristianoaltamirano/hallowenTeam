/** GUILLE **/
var halloween = halloween || {};

halloween.Spine = function(spineData, objConfig){
    PIXI.spine.Spine.apply( this, arguments );

    this._animationsDataConfig  = null;
    this._trackEntry            = {};
    this._trackCurrent          = 0;    
    this.init( spineData, objConfig );
}

// halloween.Utils.inheritPrototype(halloween.Spine, PIXI.spine.Spine);

halloween.Spine.prototype.init = function(spineData, objConfig){
    
    this.setScale( this.calculateScale() );
    
    if(objConfig){
        this.setDataConfig(objConfig);
        
        if(objConfig.mixAnimations){
            this.setMix( objConfig.mixAnimations );
        }
    }
    
    this.addEventListener();
};


/****************************************/ 
/**** Animation State Data Methods *****/
/**************************************/ 

/*** Retorna el objeto de configuracion de las animaciones ***/
halloween.Spine.prototype.getDataConfig = function(){
    return this._animationsDataConfig;
};

/*** Retorna la scale del objeto ***/
halloween.Spine.prototype.getScale = function( scale ){
    this._spineObject.scale.get();
};

/*** Retorna un Array con todas las animaciones del objeto Spine ***/
halloween.Spine.prototype.getAnimations = function(){
    return this.spineData.animations;
};

/*** Setea la config del objeto Spine para usarlos en las animaciones con string ***/
halloween.Spine.prototype.setDataConfig = function(data){
    this._animationsDataConfig = data;
};

/*** Setea la scala del objecto spine claculada segun la resolución de pantalla ***/
halloween.Spine.prototype.setScale = function( scale ){
    
    if( scale[1] > -1 )
        this.scale.set( scale[1] );
};

/*** Calcula la Scala del nuevo objeto segun la resolución de pantalla ***/
halloween.Spine.prototype.calculateScale = function(){

    var resolution = window.screen.width;        
    const arrayDeviceSizes = [
            {"size": 240, "scale": 0.126},
		    {"size": 320, "scale": 0.207},
		    {"size": 360, "scale": 0.233},
		    {"size": 375, "scale": 0.243},
		    {"size": 414, "scale": 0.268},
		    {"size": 480, "scale": 0.311},
		    {"size": 600, "scale": 0.388},
		    {"size": 720, "scale": 0.466},
		    {"size": 900, "scale": 0.583},
		    {"size": 1080, "scale": 0.70}
        ];
    var scale = _.filter(arrayDeviceSizes, function(e){
                    if(e.size == resolution) return e;
                });
    return scale.scale;
};
/*** Setea el tiempo de transicion entre una animacion y otra ***/
halloween.Spine.prototype.setMix = function( config ){
    var i = 0, 
        n = config.length;

    for( ; i < n ; i++ ){
        this.stateData.setMix( config[i].from, config[i].to, config[i].mixTime );        
    }
};


/***********************************/ 
/**** Animation State Methods *****/
/*********************************/ 

/***  Publica los Listener de las animaciones ***/
halloween.Spine.prototype.addEventListener = function(){

        this.state.addListener({
        start:      function(entry) { pubsub.publicar( halloween.AnimationSpine.ANIMATION_START , entry ); },
        end:        function(entry) { pubsub.publicar( halloween.AnimationSpine.ANIMATION_END , entry );  },        
        complete:   function(entry) { pubsub.publicar( halloween.AnimationSpine.ANIMATION_COMPLETE , entry );  },
        event:      function(entry, event) { pubsub.publicar( halloween.AnimationSpine.ANIMATION_EVENT , event.data ); },
        dispose:    function(entry) { pubsub.publicar( halloween.AnimationSpine.ANIMATION_DISPOSE , entry );  },
        interrupted: function(entry){ pubsub.publicar( halloween.AnimationSpine.ANIMATION_INTERRUPTED , entry ); }
    });

};

/*** Reproduce una animación del Objeto
 * params: 
 * String: "Nombre de Animacion" o
 * Object: {Nombre de Animacion, Loop, Delay}
 * ***/
halloween.Spine.prototype.play = function(params){
    var entry = null;
    
    if( _.isObject(params) ){
        entry = this.state.addAnimation(this._trackCurrent, params.name, params.loop, params.delay);
        if(params.reverse != undefined && params.reverse) this.state.timeScale = -1;       

    }else if( _.isString(params) ){
        var objConfig       = this.getDataConfig();
        var dataAnimation   = _.where( objConfig.animations , {name: params} );

        for(var i = 0; i < dataAnimation.length; i++ ){
            entry = this.state.addAnimation(this._trackCurrent, dataAnimation[i].name, dataAnimation[i].loop, dataAnimation[i].delay);
        }
    }

    if(!entry){
        console.warn('Objeto de Animación ó Nombre de Animación Invalido');
    }

    return entry;
};

/*** Reproduce una animación inmediatamente sin esperar que la animación anterior termine
 * params: 
 * String: "Nombre de Animacion" o
 * Object: {Nombre de Animacion, Loop, Delay}
 * ***/

halloween.Spine.prototype.forcePlay = function( params ){
    var entry = null;

    if( _.isObject(params) ){
        entry = this.state.setAnimation(this._trackCurrent, params.name, params.loop, params.delay);

    }else if( _.isString(params) ){
        var objConfig       = this.getDataConfig();
        var dataAnimation   = _.where( objConfig.animations , {name: params} );

        for(var i = 0; i < dataAnimation.length; i++ ){
            entry = this.state.setAnimation(this._trackCurrent, dataAnimation[i].name, dataAnimation[i].loop, dataAnimation[i].delay);
        }
    }

    if(!entry){
        console.warn('Objeto de Animación ó Nombre de Animación Invalido');
    }

    return entry;
};

/*** Remueve todas las animaciones cargadas en el track ***/
halloween.Spine.prototype.removeAnimations = function(){
    
    this.state.clearTracks();
    this.state.clearListeners();
};

/*** Remueve el objecto de Spine ***/
halloween.Spine.prototype.remove = function(){
    this.state.clearListeners();
    this.destroy();
};

/*** Retorna el objecto de Animacion en reproducción ***/
halloween.Spine.prototype.getCurrentAnimation = function( track ){
    var trackIndex = ( track != undefined ) ? track : this._trackCurrent;
    return this.state.getCurrent( trackIndex );
}

/***********************************/ 
/******* TrackEntry Methods *******/
/*********************************/ 

/*** Retora animaciones en Loop  
 * params: 
 * String: "Nombre de Animacion"
 * undefined: Retorna todas las animaciones en Loop
***/
halloween.Spine.prototype.getLoop = function(params){
   
    var loop        = [],
        arrayTracks = this.state.tracks;
    var i = 0, n = arrayTracks.length;

    for( ; i < n; i++ ){

        if( params && _.isString(params) ){
            if( arrayTracks[i].animation.name === params ){
                loop.push( arrayTracks[i] );
                break;
            }
        }else{
            if (arrayTracks[i].loop){
                loop.push( arrayTracks[i] );
            }
        }
    }

    return loop;
};

/*** Retorna el numero (Integer) de loop que ha terminado una animacion 
 * params: objecto Track  (retortando por el metodo Play)
***/
halloween.Spine.prototype.getCountLoop = function(params){

    return Math.floor( Number(params.trackTime).toFixed(20) / Number(params.animationEnd).toFixed(20) );
};