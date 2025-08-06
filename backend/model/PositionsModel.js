const {model} = require("mongoose");
const {PositionsSchema} = require("../schemas/PositionsShema.js")

const PositionsModel = new model("positon",PositionsSchema);

module.exports ={PositionsModel}