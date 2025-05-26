const { getActiveLayer } = require("../Layer/getActiveLayer.js")

const config = require("../../config/config.js").config
const generalComponentCallback = require("./generalCallback.js").generalComponentCallback
const generalParameterCallback = require("./generalCallback.js").generalParameterCallback
const getParameterValue = require("../Tag/getParameterValue.js").getParameterValue
const generalInitComponent = require("./generalInit.js").generalInitComponent
const generalInitParameter = require("./generalInit.js").generalInitParameter

function loadComponent(id,layerName) {

    const div = document.getElementById(id)
    let componentList = null;
    Object.entries(config.components).forEach(([category, items]) => {
        if (id == category) {
            componentList = items;
        }
    })
    console.log("组件列表", componentList)
    if (componentList == null) {
        console.log("没有找到组件列表, id:", id)
        return;
    }
    // 这里的component来自config.json
    componentList.forEach(component => {
        const newDiv = document.createElement("div")
        newDiv.id = "div_" + component.name
        const componentElement = document.createElement("input")
        componentElement.id = "component_" + component.name
        componentElement.type = component.type
        const componentLabel = document.createElement("label")
        componentLabel.innerHTML = component.appearance
        generalComponentCallback(componentElement, component)
        generalInitComponent(layerName, componentElement)
        newDiv.appendChild(componentElement)
        newDiv.appendChild(componentLabel)
        component.parameters.forEach((parameter) => {
            const parameterElement = document.createElement("input")
            parameterElement.id = "parameter_" + parameter.name
            parameterElement.type = parameter.type
            // 尝试得到参数的值
            const tryGetParameterValue = getParameterValue(component.name, parameter.name)
            if (tryGetParameterValue != null) {
                parameterElement.value = tryGetParameterValue
            } else {
                parameterElement.value = parameter.default
            }
            const parameterLabel = document.createElement("label")
            parameterLabel.innerHTML = parameter.appearance
            generalInitParameter(layerName,componentElement, parameterElement)
            generalParameterCallback(component,parameterElement, parameter)
            newDiv.appendChild(parameterLabel)
            newDiv.appendChild(parameterElement)
        })
        div.appendChild(newDiv)
    });
}
module.exports = { loadComponent }