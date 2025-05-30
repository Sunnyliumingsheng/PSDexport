const getLayerKindConfig = require("../../config/getLayerKindConfig.js").getLayerKindConfig
const generalComponentCallback = require("./generalCallback.js").generalComponentCallback
const generalParameterCallback = require("./generalCallback.js").generalParameterCallback
const getParameterValue = require("../Tag/getParameterValue.js").getParameterValue
const generalInitComponent = require("./generalInit.js").generalInitComponent
const generalInitParameter = require("./generalInit.js").generalInitParameter
const parseRule = require("../rule.js").parseRule
const rectTransformInit = require("./rectTransform.js").rectTransformInit
const rectTransformCallback = require("./rectTransform.js").rectTransformCallback

function loadComponent(id, layerName) {
    const result = parseRule(layerName)
    const div = document.getElementById(id)
    let componentList = getLayerKindConfig(id);
    if (componentList == null) {
        console.log("没有找到组件列表, id:", id)
        return;
    }
    // 这里的component来自config.json
    componentList.forEach(component => {

        // 生成一个div
        const newDiv = document.createElement("div")
        newDiv.id = "div_" + component.name
        newDiv.class = "componentDiv"
        div.appendChild(newDiv)


        switch (component.type) {
            case "radioGroup": {
                if (component.name != "horizontalAnchor" && component.name != "verticalAnchor") {
                    throw new Error("必须写入自定义的处理方式,如果只想打标签请使用checkbox")
                }
                const spRadioGroup = document.createElement("sp-radio-group")
                spRadioGroup.setAttribute("column")
                spRadioGroup.id = "radioGroup_" + component.name
                component.parameters.forEach((parameter) => {
                    const spRadio = document.createElement("sp-radio")
                    spRadio.textContent = parameter.appearance
                    spRadio.value = parameter.name
                    spRadio.id = "radioGroup_" + component.name + "radio_" + parameter.name
                    spRadioGroup.appendChild(spRadio)
                })
                newDiv.appendChild(spRadioGroup)
                rectTransformInit(result, spRadioGroup, component.name)
                rectTransformCallback(spRadioGroup)
                break;
            }
            default: {
                // 生成一个组件的input和label
                const componentElement = document.createElement("input")
                componentElement.id = "component_" + component.name
                componentElement.type = component.type
                const componentLabel = document.createElement("label")
                componentLabel.innerHTML = component.appearance
                newDiv.appendChild(componentElement)
                newDiv.appendChild(componentLabel)

                // 读取
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
                break;
            }
        }


    });
}
module.exports = { loadComponent }