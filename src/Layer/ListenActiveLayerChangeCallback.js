const getActiveLayer = require("./getActiveLayer.js").getActiveLayer;
const loadPage= require("../loadPage.js").loadPage;

function listenActiveLayerChangeCallback() {
    try {
        const layer = getActiveLayer();
        if (layer == null) {
            return
        } else {
            console.log(layer);
            navigateToLayerPage(layer.kind)
        }
    } catch (err) {
        console.log(err)
    }
}
function navigateToLayerPage(layerKind) {
    loadPage(layerKind)
}
module.exports = { listenActiveLayerChangeCallback }