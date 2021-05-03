const mongoose = require('mongoose');
const salsaSchema = mongoose.Schema({
        userId:{type:String},
        name:{type:String},
        description:{type:String},
        manufacturer:{type:String},
        mainPepper:{type:String},
        heat:{type:Number},
        likes:{type:Number},
        dislikes:{type:Number},
        usersLiked:[{type:String}],
        usersDisliked:[{type:String}],
    imageUrl:{type:String}
});

module.exports = mongoose.model('Salsa', salsaSchema); 