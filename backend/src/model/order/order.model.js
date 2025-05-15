const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    books: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    address:{
        country:{
            type: String,
        },
        city: {
            type: String,
        },
        street: {
            type: String,
        }
    }, 
    phone: {
        type: String
    },
    orderTime: {
        type: Date,
        default: Date.now
    },
    status: { 
        type: String, 
        default: 'Pending' 
    },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;