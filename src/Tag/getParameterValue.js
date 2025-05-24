const parseRule= require("../rule.js").parseRule;
const getActiveLayer=require('../Layer/getActiveLayer.js').getActiveLayer;
// 返回当前参数的string格式的值
function getParameterValue(componentName,parameterName){
    const layer=getActiveLayer()
    const layerNameString = layer.name;
    const result = parseRule(layerNameString);
    console.log("result",result)
    result.components.forEach((component)=>{
        if(component.name==componentName){
            return component.parameters[parameterName]
        }
    })
    return null
}

module.exports={getParameterValue}