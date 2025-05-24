const parseRule= require('../rule.js').parseRule;
const revertParsedName= require('../rule.js').revertParsedName;

function addComponent(stringName,componentName){
    const result = parseRule(stringName);
    result.components.push({name:componentName,parameters:{}});
    const newName=revertParsedName(result);
    return newName;
}
module.exports={
    addComponent 
}