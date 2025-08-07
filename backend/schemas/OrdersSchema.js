const { Schema } = require("mongoose");


const OrdersSchema = new Schema({
    name: String,
    qty: Number,
    price: Number,
    mode: String,
    username: String // Added username field
});
module.exports = { OrdersSchema };