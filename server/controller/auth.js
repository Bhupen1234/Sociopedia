import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js"

export const register = async(req,res)=>{
    try {
       
        const {
            firstName,lastName,email,picturePath,friends,location,occupation,viewedProfile,impressions,password
        }= req.body;

        console.log(req.body)

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        const newUser = await User({
            firstName,lastName,email, password: passwordHash,picturePath,friends,location,occupation,viewedProfile:Math.floor(Math.random()*1000),impressions:Math.floor(Math.random()*1000)
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error)
    }
}

export const login = async(req,res)=>{
    try {
        const {email, password}=req.body;
        const user = await User.findOne({email:email})
        if(!user){
            res.status(400).json({error:"User Does not exist"})
        }
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({error:"Incorrect Email or Password"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token ,user})

    } catch (error) {

        console.log(error)
        res.status(500).json({error:error.message})

    }
}