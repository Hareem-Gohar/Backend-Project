const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getAllUsers = async (req , res) =>{
      try{
            const user = await User.find();
            res.json(user);
            // console.log(recipes); 
      }
      catch(err){
            res.status(500).json({message: err.message});
      }
}


// Register new user 

exports.registerUser = async (req, res) =>{
      const {username , email , password } = req.body;
      try{
            const user = new User({
                  username ,
                  email ,
                  password,
            })
            await user.save();
            res.status(201).json({message : "User created successfully"})
      }
      catch(err){
            res.status(500).json({message : err.message})
      }
};


// login User 


exports.loginUser = async (req, res) =>     {
      const {email , password} = req.body;
      try{
            const user = await User.findOne({email});
            if (!user) {
                  return res.status(400).json({ message: "Invalid User" });
              }
              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) {
                  return res.status(400).json({ message: "Invalid Password" });
              }
              const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
                  expiresIn: '1h',
              });
              
            res.json({token});
      }catch(err){
            res.status(500).json({message : err.message})
      }
}