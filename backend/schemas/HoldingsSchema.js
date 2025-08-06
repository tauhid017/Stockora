const {Schema} = require("mongoose");

const HoldingsSchema = new Schema({
    name:String,
    qty:Number,
    price:Number,
    avg:Number,
    net:String,
    day:String,
});
module.exports={HoldingsSchema};