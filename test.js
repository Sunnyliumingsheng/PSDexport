const getAnchorPreset=require("./src/dynamic/rectTransform.js").getAnchorPreset
const getAnchor=require("./src/dynamic/rectTransform.js").getAnchor

console.log(getAnchorPreset("left", "top"));      // leftTop
console.log(getAnchorPreset("top", "left"));      // leftTop ✅顺序颠倒仍识别
console.log(getAnchorPreset("middle", "center")); // centerMiddle
console.log(getAnchorPreset("bottom", "right"));  // rightBottom
console.log(getAnchorPreset("stretch", "stretch")); // stretchStretch
console.log(getAnchorPreset("wrong", "top"));     // null


console.log(getAnchor("leftTop")); // [ {x: 0, y: 1}, {x: 0, y: 1} ]

console.log(getAnchor("stretchMiddle")); 
// [ { x: 0, y: 0.5 }, { x: 1, y: 0.5 } ]

console.log(getAnchor("centerStretch")); 
// [ { x: 0.5, y: 0 }, { x: 0.5, y: 1 } ]

console.log(getAnchor("stretchStretch"));