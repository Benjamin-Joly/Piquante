const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const salsaSchema = mongoose.Schema({
    sauce:{
        name:{type:String},
        description:{type:String},
        manufacturer:{type:String},
        mainPepper:{type:String},
        heat:{type:Number},
    },
    image:{type:String}
});

salsaSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Salsa', salsaSchema);