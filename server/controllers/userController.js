const db = require('../models')
const User = db.User
const {Op} = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const handlebars = require('handlebars')
const transporter = require('../middleware/transporter')

module.exports = {
    register: async (req, res) => {
        try{
            const {name, username, email, password, referral, bio} = req.body
            const findUser = await User.findOne({
                where:{
                    [Op.or]:[
                        {username:username},
                        {email:email}
                    ]
                }
            })
            if(findUser == null){
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)

                const result = await User.create({
                    name: name,
                    username: username,
                    email: email,
                    password: hashPassword,
                    bio: bio,
                    referral: referral
                })
                
                let payload = {id: result.id}
                const token = jwt.sign(payload, 'TwitterNotX')
                const data = fs.readFileSync('./template.html', 'utf-8')
                const tempCompile = await handlebars.compile(data)
                const tempResult = tempCompile({username: username, link:`http://localhost:3000/verify/${token}`})

                await transporter.sendMail({
                    from: 'ditto@gmail.com',
                    to: email,
                    subject: 'Email Confirmation',
                    html: tempResult
                }) 
            }else{
                res.send(400).send("User already exist")
            }
            res.status(200).send('Register Success')
        }catch (err){
            console.log(err);
            res.status(400).send({message: err.message})
        }
    },
    userLogin: async(req, res) => {
        try{
            const {email, password} = req.query;
            
            const userLogin = await User.findOne({
                where:{
                    email: email
                } 
            })
            if(userLogin == null){
                return res.status(409).send({
                    message: 'User not found'
                })
            }

            const isValid = await bcrypt.compare(password, userLogin.password)
            if(!isValid){
                return res.status(400).send({
                    message: 'Incorrect password'
                })
            }

            //data yang mau disimpan di token
            let payload = {id: userLogin.id}
            const token = jwt.sign(payload, 'TwitterNotX', {expiresIn: '1h'})
            
            res.status(200).send({
                message: "Login success",
                userLogin,
                token
            })
        }catch(err){
            console.log(err);
            res.status(400).send({message: err.message})
        }
    },
    keepLogin: async(req, res) => {
        try{
            console.log("Object REQ", req.user);

            const user = await User.findOne({
                where:{
                    id: req.user.id
                }
            })
            console.log("USER findOne:", user);
            res.status(200).send({message: "Keep login", user})
        }catch(err){
            res.status(400).send({err: err.message})
        }
    },
    getAll: async (req, res) => {
        try{
            const result = await User.findAll()
            res.status(200).send(result)
        }catch(err){
            console.log(err);
            res.status(400).send({message: err.message})
        }
    },
    getById: async(req, res) => {
        try{
            const id = req.params.id;
            //findOne 1 object
            //findAll jadi array
            const result = await User.findOne(
                {
                    attributes: {
                        exclude: ["password"]
                    },
                    where: {
                        id: req.params.id
                    }
                })
            res.status(200).send(result)
        }catch(err){
            console.log(err);
            res.status(400).send({message: err.message})
        }
    },
    deleteById: async(req, res) => {
        try{
            const id = req.params.id;
            const result = await User.destroy({
                where: {
                    id: id,
                },
            });
            res.status(200).send({result})
        }catch(err){
            console.log(err);
            res.status(400).send({message: err.message})
        }
    },
    updateUserById: async(req, res) =>{
        try{
            const id = req.params.id;
            const {username, email, password} = req.body;
            const result = await User.update(
                {
                    username: username,
                    email: email,
                    password: password
                },
                {
                    where:{
                        id: id,
                    }  
                },
            );
            res.status(200).send({result})
        }catch(err){
            console.log(err);
            res.status(400).send({message: err.message})
        }
    },
    updateIsVerified: async(req, res) =>{
        try{
            const result = await User.update(
                {
                    isVerified: true
                },
                {
                    where:{
                        id: req.user.id,
                    }  
                },
            );
            res.status(200).send("Updated isVerified")
        }catch(err){
            res.status(400).send({err: err.message})
        }
    },
    deleteUserById: async(req, res) =>{
        try{
            const id = req.params.id;
            const {username, email, password} = req.body;
            const result = await User.update(
                {
                    username: username,
                    email: email,
                    password: password
                },
                {
                    where:{
                        id: id,
                    }  
                },
            );
            res.status(200).send({result})
        }catch(err){
            console.log(err);
            res.status(400).send({message: err.message})
        }
    },
}