const config = require('./config/config.js').config;
const host = require('uxp').host;
const listenActiveLayerChangeCallback = require("./src./Layer/ListenActiveLayerChangeCallback.js").listenActiveLayerChangeCallback
const listenActiveLayerChangeEvent = require("./src/Layer/listenActiveLayerChangeEvent.js").listenActiveLayerChangeEvent
const loadPage = require("./src/loadPage.js").loadPage

function main() {

  // 加载首页

  document.getElementById("loadPageOutput").addEventListener("click", function outputPage() {
    loadPage("output")
  })
  loadPage("index")

  // 循环事件处理
  listenActiveLayerChangeEvent(listenActiveLayerChangeCallback);

}
function test() {

}

////////////////////////////////////////// ignore below

if (config.testMode) {
  try {
    test()
  } catch (err) {
    console.log("err : ", err)
  }
  hostInfo()
}
console.log("main:");
main()

function hostInfo() {
  const locale = host.uiLocale;
  const hostName = host.name
  const hostVersion = host.version;
  const hostOS = require('os').platform();
  console.log(`locale: ${locale}  host ${hostName} version ${hostVersion} running on ${hostOS}`);
}