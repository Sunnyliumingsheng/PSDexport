const addComponent = require("../Tag/addComponent").addComponent
const deleteComponent = require("../Tag/deleteComponent").deleteComponent
const getActiveLayer = require("../Layer/getActiveLayer.js").getActiveLayer
const renameLayer = require("../Layer/renameLayer.js").renameLayer


function generalCallback(newElement, configInfo) {
    switch (newElement.type) {
        case "checkbox":
            checkboxCallback(newElement, configInfo)
            break
    }
}

function checkboxCallback(newElement, configInfo) {
    newElement.addEventListener("change", function () {
        let layer = getActiveLayer()
        if (layer != null) {
            if (this.checked) {
                let newName = addComponent(layer.name, configInfo.name)
                renameLayer(layer, newName)
            } else {
                let newName = deleteComponent(layer.name,configInfo.name)
                renameLayer(layer,newName)
            }
        }
        console.log("change")
    });
}








module.exports = { generalCallback }