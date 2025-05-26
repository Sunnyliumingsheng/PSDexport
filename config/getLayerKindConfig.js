const config = require("./config.js").config

// 输入id 为配置表中现有的图层 group , text 等
function getLayerKindConfig(id) {
    if (id == "index") {
        return null
    }

    for (const [category, items] of Object.entries(config.components)) {
        if (id == category) {
            return items
        }
    }

    console.error("没有找到组件列表, id:", id)
    return null
}

module.exports = { getLayerKindConfig }