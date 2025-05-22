const outputListen= require("./output/output.js").listen



function loadPage(id) {
    console.log("view",document.querySelectorAll('.view'))
    document.querySelectorAll('.view').forEach(div => {
        div.style.display = 'none'
    });
    document.getElementById(id).style.display = 'block';
    switch(id){
        case "output":
            outputListen()
            break;
        case "index":
            break;
        case "group":
            break;
        case "smartObject":
            break;
        default:
            console.log("记得需要添加listen不然按钮没用");
            break;

    }
}
module.exports = {
    loadPage
}