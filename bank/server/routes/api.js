const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transactions')


router.get('/transactions', function (req, res) {
    Transaction
        .find({})
        .exec(function (err, transactions) {
            res.send(transactions)
        })
})

router.post('/transaction', function (req, res) {
    let data = req.body
    let transaction = new Transaction(data)
    transaction.save()
    res.end()
})

// router.delete('/transactions', function(req,res){

// })


module.exports = router