function handleText(layerDesc, result) {
  result.textLayerData.kind = "text"
  result.textLayerData.text = layerDesc.textKey.textKey
  result.textLayerData.fontSize = layerDesc.textKey.textStyleRange[0]?.textStyle.impliedFontSize?._value
  result.textLayerData.color = layerDesc.textKey.textStyleRange?.[0]?.textStyle?.color
    ? {
      r: layerDesc.textKey.textStyleRange[0].textStyle.color.red,
      g: layerDesc.textKey.textStyleRange[0].textStyle.color.grain,
      b: layerDesc.textKey.textStyleRange[0].textStyle.color.blue,
    }
    : null;
  result.textLayerData.textAlign = layerDesc.textKey.paragraphStyleRange?.[0]?.paragraphStyle?.align?._value || "left";
  result.textLayerData.haveShadow=(layerDesc?.layerEffects?.dropShadow!=null)
}

module.exports = { handleText }