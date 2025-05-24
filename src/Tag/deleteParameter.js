const parseRule= require('../rule.js').parseRule;
const revertParsedName= require('../rule.js').revertParsedName;


function deleteParameter(stringName,componentName,parameterName){
    const result = parseRule(stringName);
    for (let i = 0; i < result.components.length; i++) {
        if (result.components[i].name===componentName) {
            delete result.components[i].parameters[parameterName];
            break;
        }
    }
    const newName=revertParsedName(result);
    return newName;
}

module.exports={
    deleteParameter
}