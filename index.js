const mongoose = require('mongoose')
require('dotenv').config()

const { Customer, Identifier} = require('./model')

const createCustomer = ( name, age, gender) => {
    const customer = new Customer({
         name, age, gender
    })
    return customer.save()
}

const createIdentifier = ( code, customer) => {
    const identifier = new Identifier({
        customerCode: code,
        customer
    })
    return identifier.save()
}

async function showIdentifier() {
    return await Identifier.find().populate('customer')
}

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    //useCreateIndex: true,   
.then(()=>{
    console.log('connected')
}).catch((err)=>{
    console.log({msg: 'error is from here'}, err);
});

createCustomer('Tate', 40, 'male')
.then((customer)=>{
    console.log('customer created')
    return createIdentifier(customer._id.toString().substring(0, 10).toUpperCase(), customer)
}).then(()=>{
    console.log('identifier created');
    return showIdentifier
}).then(data=>{
    console.log(data);
}).catch((err)=>{
    console.log(err)
})