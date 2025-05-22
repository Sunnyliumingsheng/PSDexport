const batchPlay=require("photoshop").action.batchPlay; 
const docId=require('photoshop').app.activeDocument.id;

function getLayerInfo(layerId) {
	const res = batchPlay(
		[
			{
				_obj: 'get',
				_target: [
					{_ref: "layer", _id: layerId},
					{_ref: "document",_id: docId}
				]
			}
		],
		{ synchronousExecution: true }
	)[0];
    return res;
}

module.exports={getLayerInfo};