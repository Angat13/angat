const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    
    salary:{
          type:Number,
          required:true
    },
    work:{
        type:String,
        required:true,
        enum:['waiter','chef','worker']
    },
    email:{
        type:String,
        required:true,
        unique:true,
    }},{collection:'Person1'})

const Person1 = mongoose.model('Person',PersonSchema)
module.exports=Person1



