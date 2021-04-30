const Salsa = require('../models/Salsa');
const dotenv = require('dotenv');
dotenv.config();
const userCtrl = require('../controllers/userCtrl');
const jwt =require('jsonwebtoken');

exports.createSalsa = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
    const userId = decodedToken.userId;
    const salsaObject = JSON.parse(req.body.sauce);
    const salsa = new Salsa({
      ...salsaObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId: userId
    });
    salsa.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };


const arrayRemove = (arr, value) => {
  const result = arr.filter(id => id != value);
  return result;
}

  exports.likeSalsa = async (req, res, next) => {
    const saveLike = req.body;
    const salsaLiked = await Salsa.findOne({ _id: req.params.id });
    try{
        if(saveLike.like === 1){
            salsaLiked.usersLiked.push(saveLike.userId);
        }else if(saveLike.like === -1){
            salsaLiked.usersDisliked.push(saveLike.userId);
        }else if(saveLike.like === 0){
            salsaLiked.usersLiked = arrayRemove(salsaLiked.usersLiked, saveLike.userId);
            salsaLiked.usersDisliked = arrayRemove(salsaLiked.usersDisliked, saveLike.userId);
        };
        salsaLiked.likes = salsaLiked.usersLiked.length;
        salsaLiked.dislikes = salsaLiked.usersDisliked.length;
        const salsaLikeSaved = await salsaLiked.save();
        try{
            res.status(200).json({message:'liked !'});
        }
        catch{res.status(401).json({message:'failed to like'})}
    }
    catch(err){
        res.status(400).json({err});
    }
  };

exports.getAllSalsas = async (req, res, next) => {
   const salsas = await Salsa.find();
   if(salsas !== null){
       return res.status(200).json(salsas);
   }
};

exports.getOneSalsa = (req, res, next) => {
    Salsa.findOne({ _id: req.params.id })
    .then(salsa => res.status(200).json(salsa))
    .catch(error => res.status(404).json({ error }));
}

exports.deleteOneSalsa = (req, res, next) => {
    Salsa.deleteOne({ _id: req.params.id })
    .then(salsa => res.status(200).json({message:"objet supprimé"}))
    .catch(error => res.status(404).json({ error }));
}

exports.updateSalsa = (req, res, next) => {
    const salsaObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Salsa.updateOne({ _id: req.params.id }, { ...salsaObject, _id: req.params.id })
    .then(() => res.status(200).json({message:"updated !"}))
    .catch(error => res.status(400).json({error}))
}
