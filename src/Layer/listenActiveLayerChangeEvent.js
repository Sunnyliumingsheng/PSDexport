const {action}= require("photoshop");

function listenActiveLayerChangeEvent(callback){
    function OnActiveLayerChange(){
        callback();
    }
    action.addNotificationListener(["select"],OnActiveLayerChange);
    console.log("监听图层激活事件");
}
module.exports={listenActiveLayerChangeEvent};