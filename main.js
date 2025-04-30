const config = require('./config/config.js')
const fs = require('uxp').storage.localFileSystem
const path = require('path')
const core = require('photoshop').core
const app = require('photoshop').app
const host = require('uxp').host;
const batchPlay = require("photoshop").batchPlay
const handler = require("./src/handler.js")
const extracter = require("./src/extract.js")
const rasterize = require("./src/rasterize.js")

function main() {
  document.getElementById("btnExport").addEventListener("click", handler.exportLayerData);
  document.getElementById("btnExtractPNG").addEventListener("click", extracter.extractAllPNG);
  document.getElementById("btnRasterizing").addEventListener("click", rasterize.rasterizing);
  document.getElementById("btnRasterizingSmartObject").addEventListener("click", rasterize.rasterizingSmartObject);
}

async function test() {
}



if (config.testMode) {
  console.log("test:");

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