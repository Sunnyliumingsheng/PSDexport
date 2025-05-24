const config = require("../../config/config.js").config
const generalCallback = require("./generalCallback.js").generalCallback


function loadComponent(id) {
    const div = document.getElementById(id)
    let componentList = null;
    Object.entries(config.components).forEach(([category, items]) => {
        if (id == category) {
            componentList = items;
        }
    })
    console.log("组件列表",componentList)
    if (componentList == null) {
       console.log("没有找到组件")
        return; 
    }
    componentList.forEach(component => {
        const newElement= document.createElement("input")
        newElement.id=component.name
        newElement.class=id
        newElement.type=component.type
        const label= document.createElement("label")
        label.innerHTML=component.appearance
        
        generalCallback(newElement,component)
        div.appendChild(newElement)
        div.appendChild(label)
    });
}
module.exports = { loadComponent }