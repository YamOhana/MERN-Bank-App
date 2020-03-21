const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount: Number,
    catagory: String,
    vendor: String
})

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction
