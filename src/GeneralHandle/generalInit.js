
function generalInitComponent(result, componentElement) {
    if (result.components.length != 0) {
        // 存在组件，需要给dom中组件里不同input进行提前赋值
        result.components.forEach(component => {
            if ("component_" + component.name == componentElement.id) {
                switch (componentElement.type) {
                    case "checkbox": {
                        // 这里可能需要注意
                        componentElement.checked = true
                        break;
                    }
                }
            }
        })
    }
}
function generalInitParameter(result,componentElement, parameterElement) {
    if (result.components.length!= 0) {
       // 存在组件，开始遍历组件 
       result.components.forEach(component => {
        if ("component_" + component.name == componentElement.id) {
           // 找到组件，开始遍历参数
           if (component.parameters!=null) {
            for(const parameter in component.parameters) {
                if ("parameter_" + parameter.name == parameterElement.id) {
                    switch (parameterElement.type) {
                        case "text": {
                            parameterElement.value = parameter.value
                            break;
                        }
                    }
                }
            }
           }
        } 
       })
    }
}


module.exports = { generalInitComponent, generalInitParameter }
