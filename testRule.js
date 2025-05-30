const parsedRule= require("./src/rule.js").parseRule
const revertParsedName= require("./src/rule.js").revertParsedName
testList=[
  "普通图片/leftTop>组件一/参数一:false/参数二:123123>组件二/没有值的参数",
  "组队情报2/centerTop>prefab/name:第一个预制体"
]
testList.forEach(element => {
  const result =parsedRule(element)
  console.log("解析到的结果",JSON.stringify(result))
  const newName=revertParsedName(result)
  console.log("revert name:",newName)
  const result2=parsedRule(newName)
  console.log("revert 解析到的结果",JSON.stringify(result2))
  if(JSON.stringify(result)==JSON.stringify(result2)){
    console.log("解析结果一致") 
  }
  console.log("------------------")
});

