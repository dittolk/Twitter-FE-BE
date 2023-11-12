const db = require('../models')
const Tweet = db.Tweet
const User = db.User;

module.exports = {
    post_tweet: async (req, res)=>{
        try{
            const {id, tweet} = req.body;
            const result = await Tweet.create({
                UserId: id,
                tweet: tweet
            })
            res.status(200).send('Tweet Success')
        }catch(err){
            console.log(err);
        }
    },
    get_tweet: async(req, res) => {
        try{
            const result = await Tweet.findAll(
                //findAndCountAll
                {
                    //sorting by id DESC
                    order:[
                        [
                            "id", "DESC"
                        ]
                    ],
                    //tabel tweet
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id"]
                    },
                    //include tabel User
                    include: {
                        model: User,
                        required: true,
                        attributes: ["username", "name"]
                    },
                })
            res.status(200).send(result)
        }catch(err){
            console.log(err);
            res.status(400).send({message: err.message})
        }
    },
    get_tweetById: async(req, res) => {
        try{
            const id = req.params.id
            const result = await Tweet.findAndCountAll(
                {
                    //include tabel User
                    include: {
                        model: User,
                        required: true,
                        attributes: ["username", "email"]
                    },
                    where:{
                        UserId : id
                    }
                })
            res.status(200).send({result})
        }catch(err){
            console.log(err);
            res.status(400).send({message: err.message})
        }
    }
}