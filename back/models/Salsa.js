const mongoose = require('mongoose');

const salsaSchema = mongoose.Schema({
        userId:{type:String},
        name:{
            type:String, 
            minlength:[3, 'gimme more letters selfish !'], 
            maxlength:[20, 'Calm down, too many letters !'],
            validate: [/^[A-Za-zÀ-ÖØ-öø-ÿ0-9- ]*$/, 'hey don\'t use those letters with me !'] 
        },
        description:{
            type:String, 
            minlength:[3, 'gimme more letters selfish !'], 
            maxlength:[20, 'Calm down, too many letters !'],
            validate: [/^[A-Za-zÀ-ÖØ-öø-ÿ0-9- ]*$/, 'hey don\'t use those letters with me !'] 
        },
        manufacturer:{
            type:String, 
            minlength:[3, 'gimme more letters selfish !'], 
            maxlength:[20, 'Calm down, too many letters !'],
            validate: [/^[A-Za-zÀ-ÖØ-öø-ÿ0-9- ]*$/, 'hey don\'t use those letters with me !'] 
        },
        mainPepper:{
            type:String, 
            minlength:[3, 'gimme more letters selfish !'], 
            maxlength:[20, 'Calm down, too many letters !'],
            validate: [/^[A-Za-zÀ-ÖØ-öø-ÿ0-9- ]*$/, 'hey don\'t use those letters with me !'] 
        },
        heat:{type:Number, min:1, max:10},
        likes:{type:Number},
        dislikes:{type:Number},
        usersLiked:[{type:String}],
        usersDisliked:[{type:String}],
        imageUrl:{type:String}
});

module.exports = mongoose.model('Salsa', salsaSchema); 