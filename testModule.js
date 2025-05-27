//const config=require("./config.json")
var config
fetch("http://localhost:80/config.json").then(response => {
  if (response.ok) {
    return response.json();
}
}).then(json=>{
  config=json;
  console.log("config",config)
})




module.exports = {config};
