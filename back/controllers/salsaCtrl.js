const Salsa = require('../models/Salsa');
const dotenv = require('dotenv');
dotenv.config();

exports.createSalsa = (req, res, next) => {
    const salsa = new Salsa({
        sauce:{
            name:req.body.name,
            description:req.body.description,
            manufacturer:req.body.manufacturer,
            mainPepper:req.body.mainPepper,
            heat:req.body.heat
        },
        image:req.body.image
    });
    console.log(salsa);
    salsa.save()
    .then(res => res.status(201).json({res}))
    .catch(error => res.status(400).json({error}))
}

exports.getAllSalsas = async (req, res, next) => {
   const salsas = await Salsa.find();
   if(salsas !== null){
       return res.status(200).json(salsas);
   }
}