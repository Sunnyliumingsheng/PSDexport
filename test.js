const parsedRule= require("./src/rule.js").parseRule

testList=[
  "普通图片/middleCenter>组件一/参数一:false/参数二:123123>组件二/没有值的参数",
  "现有图层",
  "普通图层3>组件一/参数一:12d"
]
testList.forEach(element => {
  console.log(JSON.stringify(parsedRule(element)))
});