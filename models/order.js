var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    orderAmount: {
        service_charges: {
            type: Number,
            default: 0
        },
        restaurant_charges: {
            type: Number,
            default: 0
        },
        valet_charges: {
            type: Number,
            default: 0
        },
        base_price: {
            type: Number,
            default: 0
        },
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_restaurant"
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_customer"
    },
    valet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_valet"
    },
    item_list: {
        type: Array,
        count: {
            type: Number
        },
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food"
        }
    },
    status: {
        type: String
    },
    rating: {
        foodRating: {
            type: Array
        },
        valetRating: {
            type: Number
        }
    }
});

module.exports = mongoose.model("Order", orderSchema);