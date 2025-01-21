const { error } = require('console')
const mongoose= require('mongoose')

const mongodbURL=("mongodb://localhost:27017/hotels")

mongoose.connect(mongodbURL)
const db = mongoose.connection

db.on('connected',()=>{
    console.log("Connected")
})
db.on('disconnected',()=>{
    console.log("disconnected")
})

db.on('error',(error)=>{
    console.error("there is error",error)
})
module.exports=db;

