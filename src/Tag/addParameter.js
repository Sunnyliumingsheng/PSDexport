const parseRule= require('../rule.js').parseRule;
const revertParsedName= require('../rule.js').revertParsedName;

function addParameter(stringName,componentName,parameterName,paramterValueString){
    const result = parseRule(stringName);
    for (let i = 0; i < result.components.length; i++) {
        if (result.components[i].name===componentName) {
            result.components[i].parameters[parameterName]=paramterValueString;
            break;
        }
    }
    const newName=revertParsedName(result);
    return newName;
    
}
module.exports={addParameter};