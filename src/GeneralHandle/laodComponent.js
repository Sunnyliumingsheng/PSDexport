const { getActiveLayer } = require("../Layer/getActiveLayer.js")

const getLayerKindConfig = require("../../config/getLayerKindConfig.js").getLayerKindConfig
const generalComponentCallback = require("./generalCallback.js").generalComponentCallback
const generalParameterCallback = require("./generalCallback.js").generalParameterCallback
const getParameterValue = require("../Tag/getParameterValue.js").getParameterValue
const generalInitComponent = require("./generalInit.js").generalInitComponent
const generalInitParameter = require("./generalInit.js").generalInitParameter
const parseRule = require("../rule.js").parseRule

function loadComponent(id, layerName) {

    const div = document.getElementById(id)
    let componentList = getLayerKindConfig(id);
    console.log("组件列表", componentList)
    if (componentList == null) {
        console.log("没有找到组件列表, id:", id)
        return;
    }
    // 这里的component来自config.json
    componentList.forEach(component => {

        // 添加元素
        const newDiv = document.createElement("div")
        newDiv.id = "div_" + component.name
        const componentElement = document.createElement("input")
        componentElement.id = "component_" + component.name
        componentElement.type = component.type
        const componentLabel = document.createElement("label")
        componentLabel.innerHTML = component.appearance
        newDiv.appendChild(componentElement)
        newDiv.appendChild(componentLabel)
        // 读取层级名字并得到一个result
        const result = parseRule(layerName)

        // 对组件进行初始化，将result中已经确认有了的组件勾选到
        generalInitComponent(result, componentElement)

        // 生成回调函数
        generalComponentCallback(componentElement, component)

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
            generalInitParameter(result, componentElement, parameterElement)
            generalParameterCallback(component, parameterElement, parameter)
            newDiv.appendChild(parameterLabel)
            newDiv.appendChild(parameterElement)
        })
        div.appendChild(newDiv)
    });
}
module.exports = { loadComponent }