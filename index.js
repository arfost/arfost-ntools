
module.exports.ParamChecker = class {
    constructor(params){
        this.checkParams(params)
        this.params = params
    }

    checkParams(params){
        if(!params)
            throw new TypeError("Undefined params, send a literal object with this properties : " + this.neededParams.join(', '))
        let paramsGood = true;
        for(let param of this.neededParams){
            paramsGood = paramsGood && (typeof params[param] !== 'undefined');
        }

        if(!paramsGood)
            throw new TypeError("missing params, needed params are : " + this.neededParams.join(', '))
    }

    get neededParams(){
        throw "you must override neededParams with a getter returning an array of strings"
    }
}

module.exports.ParamsFromFileOrObject = class ParamsFromFileOrObject extends module.exports.ParamChecker{
    constructor(params){
        if(typeof params === 'string'){
            params = require(params)
        }
        super(params)
    }
}

module.exports.random = function getRandomIntInclusive(min, max) {
    if(typeof max === 'undefined'){
        max = min;
        min = 1;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }