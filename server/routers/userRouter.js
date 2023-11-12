const router = require('express').Router()
const {userController} = require('../controllers')
const { verifyToken } = require('../middleware/auth')

router.post('/register', userController.register) //register user
router.get('/login', userController.userLogin) //login user
router.get('/keep-login', verifyToken, userController.keepLogin) //keep login
router.patch('/verify', verifyToken, userController.updateIsVerified);
router.patch('/delete-account', verifyToken, userController.deleteUserById);

router.get('/getall', userController.getAll)
router.get('/:id', userController.getById)

module.exports = router