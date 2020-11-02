var mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
const Order = require("./order");

var userRestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 10,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    salt: String,
    encry_password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        default: "Not Assigned"
    },
    description: {
        type: String
    },
    image: {
        data: {
            type: Buffer
        },
        contentType: {
            type: String
        }
    },
    rating: {
        type: Array,
        default: [0, 0, 0, 0, 0]
    },
    orderlist: {
        type: [Order.schema],
        default: []
    },
    foodlist: {
        type: Array,
        default: []
    },
    isAcceptingOrder: {
        type: Boolean,
        required: true,
        default: false
    }
},
    { timestamps: true }
);

userRestaurantSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

userRestaurantSchema.methods = {
    autheticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainpassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User_restaurant", userRestaurantSchema);