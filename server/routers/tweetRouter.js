const router = require('express').Router()
const {tweetController} = require('../controllers');
const { verifyToken } = require('../middleware/auth');

router.post('/post-tweet', verifyToken, tweetController.post_tweet)
router.get('/get-tweet', verifyToken, tweetController.get_tweet)

module.exports = router;