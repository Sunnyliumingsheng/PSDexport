const getActiveLayer=require("./getActiveLayer.js").getActiveLayer;
const getLayerInfo=require("./getLayerInfo.js").getLayerInfo;


function listenActiveLayerChangeCallback(){
    const layer=getActiveLayer();
    if(layer==null){
        return
    }else{
        console.log(layer);
        // todo 根据这里的layerinfo进行页面的跳转操作
    }
}
module.exports={listenActiveLayerChangeCallback}