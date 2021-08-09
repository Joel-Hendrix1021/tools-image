const { Schema, model } = require('mongoose')

const ImageModel = new Schema({
    title: String,
    description: String,
    originalname:String,
    path: String,
    destination:String,
    filename:String,
    date:{type:Date, default:Date.now},  
})

module.exports = model('Image', ImageModel)