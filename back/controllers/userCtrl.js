const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const accountSchema = require('../models/Validation');
dotenv.config();

exports.signup = async (req, res, next) => {
    const { error } = accountSchema.validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hash(req.body.password, salt);
    bcrypt.hash(req.body.password, 10)
        const user = new User({
            email:req.body.email,
            password:hashPw
        });
    try{
        const savedUser = await user.save();
        res.status(201).json({message:'user created !'});
    }
    catch(error){
        res.status(400).send(error)
    }
}

exports.login = async (req, res, next) => {
    const { error } = accountSchema.validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
        if(!user){ return res.status(401).json({error : 'User unknown :('}) }
        const userId = user._id;
    const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass){ return res.status(401).json({error:'Wrong password !'}) }
    const token = jwt.sign({userId: user._id}, 
                            process.env.TOKENSECRET,
                            {expiresIn:'1h'}
                        )
        res.header('Authorization', token).json({userId, token});
};