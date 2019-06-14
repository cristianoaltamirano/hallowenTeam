/** GUILLE **/
var LeanderMob = LeanderMob || {};

LeanderMob.Spine = function(spineData, objConfig){
    PIXI.spine.Spine.apply( this, arguments );

    this._animationsDataConfig  = null;
    this._trackEntry            = {};
    this._trackCurrent          = 0;    

    this.init( spineData, objConfig );
}

LeanderMob.Utils.inheritPrototype(LeanderMob.Spine, PIXI.spine.Spine);

LeanderMob.Spine.prototype.init = function(spineData, objConfig){
    
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
LeanderMob.Spine.prototype.getDataConfig = function(){
    return this._animationsDataConfig;
};

/*** Retorna la scale del objeto ***/
LeanderMob.Spine.prototype.getScale = function( scale ){
    this._spineObject.scale.get();
};

/*** Retorna un Array con todas las animaciones del objeto Spine ***/
LeanderMob.Spine.prototype.getAnimations = function(){
    return this.spineData.animations;
};

/*** Setea la config del objeto Spine para usarlos en las animaciones con string ***/
LeanderMob.Spine.prototype.setDataConfig = function(data){
    this._animationsDataConfig = data;
};

/*** Setea la scala del objecto spine claculada segun la resolución de pantalla ***/
LeanderMob.Spine.prototype.setScale = function( scale ){
    
    if( scale[1] > -1 )
        this.scale.set( scale[1] );
};

/*** Calcula la Scala del nuevo objeto segun la resolución de pantalla ***/
LeanderMob.Spine.prototype.calculateScale = function(){

    var arrayDeviceSizes = gmApi.getAvailableDeviceSizes(),
        resolution       = gmApi.getLayoutResolutionAssets();
    var scale            = _.filter(arrayDeviceSizes, function(e){
                                if(e[0] == resolution) return e;
                            });
    return scale[0];
};
/*** Setea el tiempo de transicion entre una animacion y otra ***/
LeanderMob.Spine.prototype.setMix = function( config ){
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
LeanderMob.Spine.prototype.addEventListener = function(){

        this.state.addListener({
        start:      function(entry) { pubsub.publicar( LeanderMob.AnimationSpine.ANIMATION_START , entry ); },
        end:        function(entry) { pubsub.publicar( LeanderMob.AnimationSpine.ANIMATION_END , entry );  },        
        complete:   function(entry) { pubsub.publicar( LeanderMob.AnimationSpine.ANIMATION_COMPLETE , entry );  },
        event:      function(entry, event) { pubsub.publicar( LeanderMob.AnimationSpine.ANIMATION_EVENT , event.data ); },
        dispose:    function(entry) { pubsub.publicar( LeanderMob.AnimationSpine.ANIMATION_DISPOSE , entry );  },
        interrupted: function(entry){ pubsub.publicar( LeanderMob.AnimationSpine.ANIMATION_INTERRUPTED , entry ); }
    });

};

/*** Reproduce una animación del Objeto
 * params: 
 * String: "Nombre de Animacion" o
 * Object: {Nombre de Animacion, Loop, Delay}
 * ***/
LeanderMob.Spine.prototype.play = function(params){
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

LeanderMob.Spine.prototype.forcePlay = function( params ){
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
LeanderMob.Spine.prototype.removeAnimations = function(){
    
    this.state.clearTracks();
    this.state.clearListeners();
};

/*** Remueve el objecto de Spine ***/
LeanderMob.Spine.prototype.remove = function(){
    this.state.clearListeners();
    this.destroy();
};

/*** Retorna el objecto de Animacion en reproducción ***/
LeanderMob.Spine.prototype.getCurrentAnimation = function( track ){
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
LeanderMob.Spine.prototype.getLoop = function(params){
   
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
LeanderMob.Spine.prototype.getCountLoop = function(params){

    return Math.floor( Number(params.trackTime).toFixed(20) / Number(params.animationEnd).toFixed(20) );
};