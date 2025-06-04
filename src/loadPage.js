const { getLayerFullInfo } = require("./layer.js");
const { getActiveLayer } = require("./Layer/getActiveLayer.js");

const outputListen = require("./output/output.js").listen
const loadComponent = require("./GeneralHandle/laodComponent.js").loadComponent
const doc = require("photoshop").app.activeDocument

function loadPage(id) {
    document.querySelectorAll('.view').forEach(div => {
        div.style.display = 'none'
        div.innerHTML = ""
    });
    switch (id) {
        case "output":
            const output = document.getElementById("output")
            output.innerHTML = ""
            const sections = [
                { heading: '图层工具', buttonId: 'btnExport', buttonText: '导出图层数据到文件夹' },
                { heading: '图片提取', buttonId: 'btnExtractPNG', buttonText: '提取所有图片到文件夹' },
                { heading: '一键格栅化所有矢量图层', buttonId: 'btnRasterizing', buttonText: '一键格栅化' },
                { heading: '一键格栅化所有智能对象图层', buttonId: 'btnRasterizingSmartObject', buttonText: '一键格栅化智能图层' },
            ];
            for (const section of sections) {
                // <sp-heading>标题</sp-heading>
                const heading = document.createElement('sp-heading');
                heading.textContent = section.heading;
                output.appendChild(heading);

                // <div class="button-group">
                const group = document.createElement('div');
                group.className = 'button-group';

                // <sp-button id="...">按钮文字</sp-button>
                const button = document.createElement('sp-button');
                button.id = section.buttonId;
                button.textContent = section.buttonText;

                // 添加到组，再添加到 output
                group.appendChild(button);
                output.appendChild(group);
            }
            output.style.display = 'block';
            outputListen()
            break;
        case "index":
            const prompt= document.createElement("label")
            prompt.textContent="选择一个图层即可开始"
            prompt.id="prompt"
            document.getElementById(id).appendChild(prompt)
            
        default:
            //将所有的div都设置为不可见
            const activeLayer = getActiveLayer()
            const layerName = activeLayer.name

            document.getElementById(id).style.display = 'block';
            loadComponent(id, layerName)
            break;

    }
}
module.exports = {
    loadPage
}