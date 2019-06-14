var LeanderMob = LeanderMob || {};

/***  Class Avatar Spine 
* @ params: Object
* @ params.name: String
* @ params.config: Object
***/

LeanderMob.AvatarSpine = function( params ) {

    var s = LeanderMob.AssetManager.getAsset( params.name );
    LeanderMob.Spine.call( this, s.spineData, params.config );
    
    this._state		    = [];
    this._lastState     = null;
    this._assetSpine    = null;
    this._dataConfig    = null;
	
}

LeanderMob.Utils.inheritPrototype(LeanderMob.AvatarSpine, LeanderMob.Spine);

/*** almacena todas las propiedad del objeto Spine cuando se llama al metodo 
 * params: name: String (nombre para guardar el estado del objecto)
 * ***/
LeanderMob.AvatarSpine.prototype.setState = function( name ){

    _.extend( this.lastState , this );
    this.state.push( { name: name , state: this.lastState } );
};

/*** retorna las propiedades del objecto cuando fue seteado el metodo
 * name: String (nombre con el que se guardo el estado)
***/
LeanderMob.AvatarSpine.prototype.getState = function( name ){
    var i = 0,
        state = this.state;
    var n = ( name ) ? this.state.length : 0

    for( ; i < n; i++){
        if(this.state[i].name == name){
            state = this.state[i];
        }
    }

    return state;
};