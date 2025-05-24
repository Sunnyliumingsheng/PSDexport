const parseRule= require('../rule.js').parseRule;
const revertParsedName= require('../rule.js').revertParsedName;

function deleteComponent(stringName,componentName){
    const result = parseRule(stringName);
    console.log("删除之前的",result)
    for (let i = 0; i < result.components.length; i++) {
        if (result.components[i].name===componentName) {
            result.components.splice(i, 1);
            break;
        }
    }
    console.log("删除后得到的result",result)
    const newName=revertParsedName(result);
    return newName;

}

module.exports = {deleteComponent};