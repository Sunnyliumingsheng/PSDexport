const addComponent = require("../Tag/addComponent").addComponent
const updateParameter = require("../Tag/updateParameter.js").updateParameter
const deleteComponent = require("../Tag/deleteComponent").deleteComponent
const getActiveLayer = require("../Layer/getActiveLayer.js").getActiveLayer
const renameLayer = require("../Layer/renameLayer.js").renameLayer



function generalComponentCallback(newElement, configInfo) {
    switch (newElement.type) {
        case "checkbox":
            checkboxComponentCallback(newElement, configInfo)
            break
    }
}

function generalParameterCallback(componentElement, newElement, ParameterConfigInfo) {
    switch (newElement.type) {
        case "text":
            textParameterCallback(componentElement, newElement, ParameterConfigInfo)
            break;
    }
}

function textParameterCallback(componentElement, newElement, ParameterConfigInfo) {
    newElement.addEventListener("input", function () {
        let layer = getActiveLayer()
        if (layer != null) {
            let newName = updateParameter(layer.name,componentElement.name, ParameterConfigInfo.name, newElement.value)
            renameLayer(layer, newName)
        }
    });
}

function checkboxComponentCallback(newElement, configInfo) {
    newElement.addEventListener("change", function () {
        let layer = getActiveLayer()
        if (layer != null) {
            if (this.checked) {
                let newName = addComponent(layer.name, configInfo.name)
                renameLayer(layer, newName)
            } else {
                let newName = deleteComponent(layer.name, configInfo.name)
                renameLayer(layer, newName)
            }
        }
        console.log("change")
    });
}



module.exports = { generalComponentCallback, generalParameterCallback }