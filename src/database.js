const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tools-images',{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>console.log('connectado a mongo'))

module.exports = mongoose