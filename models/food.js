var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32
    },
    price: {
        type: Number,
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_restaurant"
    },
    description: {
        type: String,
        maxlength: 48
    },
    rating: {
        type: Array,
        default: [0, 0, 0, 0, 0]
    },
    image: {
        data: {
            type: Buffer
        },
        contentType: {
            type: String
        }
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    dotColour: {
        type: String,
        default: "red"
    }
});

module.exports = mongoose.model("Food", foodSchema);