const photoshop = require("photoshop");
const { batchPlay } = photoshop.action;
const rule = require("./rule.js");
const app = require("photoshop").app
const doc = app.activeDocument;

// 处理所有的图层的基本信息，并且对智能对象和文本图层进行特殊处理
function getLayerFullInfo(layerId, docId) {
  const res = batchPlay(
    [
      {
        _obj: "get",
        _target: [
          { _ref: "layer", _id: layerId },
          { _ref: "document", _id: docId }
        ],
        _options: {
          dialogOptions: "dontDisplay"
        }
      }
    ],
    { synchronousExecution: true }
  )[0];
  return res;
}
// 提取有用的信息
async function extractUsefulLayerInfo(layerDesc, docId) {
  const result = {};
  // 通用基本信息
  result.name = layerDesc.name || "";
  result.id = layerDesc.layerID;
  result.visible = layerDesc.visible;
  result.opacity = (layerDesc.opacity ?? 255) / 255;
  // 这里解析处理图层的rectTransform，并直接以值的形式保存到result，让unity的脚本能超级方便的处理
  await handleRectTransform(layerDesc, docId, result)
  handleAllKind(layerDesc, result)

  return result;
}

////////////////////这里是对组件进行特殊处理的函数

// 处理不同种类的图层
function handleAllKind(layerDesc, result) {
  try {
    if (layerDesc.layerKind == 7) {
      result.layerKind = "group"
    }
    // 如果是文本图层（layerKind = 3）
    if (layerDesc.textKey) {
      result.textLayerData = {};
      result.layerKind = "text"
      handleText(layerDesc, result)
    }
    // 如果是智能对象图层
    if (layerDesc.smartObjectMore) {
      result.smartObjectLayerData = {};
      result.layerKind = "smartObject"
      handleSmartObject(layerDesc, result)
    }
    // 如果是像素图层
    if (layerDesc.layerKind == 1) {
      result.pixelLayerData = {};
      result.layerKind = "pixel"
      handlePixel(layerDesc, result)
    }
  } catch (err) {
    console.log("出错了", err)
  }
}

function handleSmartObject(layerDesc, result) {
  result.smartObjectLayerData.kind = "smartObject";
  result.smartObjectLayerData.height = layerDesc.smartObjectMore.size.height;
  result.smartObjectLayerData.width = layerDesc.smartObjectMore.size.width;
  result.smartObjectLayerData.fileReference = layerDesc.smartObject.fileReference;
}
function handleText(layerDesc, result) {
  result.textLayerData.kind = "text"
  result.textLayerData.text = layerDesc.textKey.textKey
  result.textLayerData.fontSize = layerDesc.textKey.textStyleRange?.[0]?.textStyle?.size?._value
  result.textLayerData.color = layerDesc.textKey.textStyleRange?.[0]?.textStyle?.color
    ? {
      r: layerDesc.textKey.textStyleRange[0].textStyle.color.red,
      g: layerDesc.textKey.textStyleRange[0].textStyle.color.grain,
      b: layerDesc.textKey.textStyleRange[0].textStyle.color.blue,
    }
    : null;
  result.textLayerData.textAlign = layerDesc.textKey.paragraphStyleRange?.[0]?.paragraphStyle?.align?._value || "left";
}

function handlePixel(layerDesc, result) {
  result.pixelLayerData.kind = "pixel"

}










///////////////这些是处理rectTransform的函数/////////////////////
// 处理名字和rectTransform
async function handleRectTransform(layerDesc, docId, result) {
  try {
    if (layerDesc.boundsNoEffects) {
      const parsedRule = rule.parseRule(result.name);
      result.name = parsedRule.name;
      const transform = parsedRule.transform;
      result.components = parsedRule.components;
      // 检查是否是最上层节点（没有parent）
      if (layerDesc.parentLayerID == -1) {
        // 最上层节点使用静态布局
        result.rectTransform = handleRectTransformLayerGourp0(layerDesc.boundsNoEffects, doc);
      } else {
        // 根据transform类型处理rectTransform
        parent = await getLayerFullInfo(layerDesc.parentLayerID, docId)
        switch (transform) {
          case "middleCenter":
            result.rectTransform = handleRectTransform0(layerDesc.boundsNoEffects, parent.boundsNoEffects);
            break;
          case "stretchStretch":
            result.rectTransform = handleRectTransform1(
              layerDesc.boundsNoEffects,
              parent.boundsNoEffects
            );
            break;
          default:
            result.rectTransform = handleRectTransform0(layerDesc.boundsNoEffects, parent.boundsNoEffects);
            break;
        }
      }
    }
  }
  catch (err) {
    console.log(err)
  }
}
// 顶部的的处理办法，用来处理最顶部的组件，因为没有parent，anchor为(0,1)(0,1),pivot为(0.5,0.5)
function handleRectTransformLayerGourp0(boundsNoEffects, doc) {

  rectTransform = {
    type: "stretchStretch",
    anchor: [
      { x: 0, y: 0 },
      { x: 1, y: 1 }
    ],
    pivot: {
      x: 0.5,
      y: 0.5
    },
    stretchStretchModeData: {
      left: boundsNoEffects.left._value,
      top: boundsNoEffects.top._value,
      // 这里需要获取父节点的宽度和高度用于计算,因为PS和unity坐标计算的方式不一样
      right: doc.width - boundsNoEffects.right._value,
      bottom: doc.height - boundsNoEffects.bottom._value,
    }
  }
  return rectTransform
}
// 编号0的处理办法，只可以处理静态不拉伸的UI，anchor为(0,1)(0,1),pivot为(0.5,0.5)
function handleRectTransform0(boundsNoEffects, parentBounds) {
  rectTransform = {
    type: "middleCenter",
    anchor: [
      { x: 0.5, y: 0.5 },
      { x: 0.5, y: 0.5 }
    ],
    pivot: {
      x: 0.5,
      y: 0.5
    },
    middleCenterModeData: {
      posX: boundsNoEffects.left._value+boundsNoEffects.width._value/2-parentBounds.left._value-parentBounds.width._value/2,
      posY: parentBounds.top._value+parentBounds.height._value/2-boundsNoEffects.top._value-boundsNoEffects.height._value/2,
      width: boundsNoEffects.width._value,
      height: boundsNoEffects.height._value,
    }
  }
  return rectTransform
}
// 编号为1的处理方案，可以处理动态的UI，anchor为(0,0)(1,1),pivot为(0.5,0.5)
function handleRectTransform1(boundsNoEffects, parentBounds) {
  rectTransform = {
    type: "stretchStretch",
    anchor: [
      { x: 0, y: 0 },
      { x: 1, y: 1 }
    ],
    pivot: {
      x: 0.5,
      y: 0.5
    },
    left: boundsNoEffects.left._value - parentBounds.left._value,
    top: boundsNoEffects.top._value - parentBounds.top._value,
    // 这里需要获取父节点的宽度和高度用于计算,因为PS和unity坐标计算的方式不一样
    right: parentBounds.right._value - boundsNoEffects.right._value,
    bottom: parentBounds.bottom._value - boundsNoEffects.bottom._value,
  }
  return rectTransform
}





module.exports = {
  getLayerFullInfo,
  extractUsefulLayerInfo,
};