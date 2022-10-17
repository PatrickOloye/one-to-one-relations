
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    name: String,
    age: Number,
    gender: String
    
})

const Customer = mongoose.model('Customer', customerSchema);

const identifierSchema = new Schema({
    customerCode: String,
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
    //you can do another method called embeded reference
    //customer: customerSchema
    //but then we wont have to populate
    //ensure to remove the populate
})


const Identifier = mongoose.model('Identifier', identifierSchema)

module.exports = {Customer, Identifier}