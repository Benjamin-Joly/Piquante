const Salsa = require('../models/Salsa');
const dotenv = require('dotenv');
dotenv.config();
const jwt =require('jsonwebtoken');
const fs = require('fs');

exports.createSalsa = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
    const userId = decodedToken.userId;

    const salsaObject = JSON.parse(req.body.sauce);
    delete salsaObject._id;
    salsaObject.likes = 0;
    salsaObject.dislikes = 0;
    salsaObject.usersDisliked = [];
    salsaObject.usersLiked = [];

    const salsa = new Salsa({
      ...salsaObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId: userId
    });

    salsa.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch((error) => {
      res.status(400).json({ error });
    }); 
  };

  exports.likeSalsa = async (req, res, next) => {
    const salsaLiked = await Salsa.findOne({ _id: req.params.id });
    const likeReq = req.body.like;
    const userReq = req.body.userId;
    try{
      const arrFilter = (arr, value) => {
        const valueIndex = arr.indexOf(value);
        const filter = arr.filter(x => x !==value);
        return arr = filter;
      }
        if(likeReq === 1){
          salsaLiked.usersLiked.push(userReq);
        } else if(likeReq === -1){
          salsaLiked.usersDisliked.push(userReq);
        } else if(likeReq === 0){
          salsaLiked.usersLiked = arrFilter(salsaLiked.usersLiked, userReq);
          salsaLiked.usersDisliked = arrFilter(salsaLiked.usersDisliked, userReq);
        }
        
        salsaLiked.likes = 0 + (salsaLiked.usersLiked.length);
        salsaLiked.dislikes = 0 + (salsaLiked.usersDisliked.length);

         salsaLiked.save()
         .then(() => res.status(200).json({message:'modif saved !'}))
         .catch(error => res.status(401).json({message:'failed to save'}));
    }catch(err){
      res.status(400).json({err})
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
  Salsa.findOne({ _id: req.params.id })
    .then(salsa => {
      const filename = salsa.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Salsa.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

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
