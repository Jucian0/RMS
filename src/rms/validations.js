function newError(err){
    if(!!err){
        throw new Error('Parameter just a string')
    }
    throw new Error(err)
}

function funcValidation(fn, param){
    if(!fn || typeof fn !== 'function'){
        newError(`Parameter ${param} just a function`)
    }
}

function validObject(obj, param){
    if(!obj || typeof obj !== 'object'){
        newError(`Parameter ${param} just a function`)
    }
}