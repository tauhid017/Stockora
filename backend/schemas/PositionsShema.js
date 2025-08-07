const {Schema} = require("mongoose");
const PositionsSchema = new Schema({
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
    username: String // Added username field
});
module.exports = {PositionsSchema};