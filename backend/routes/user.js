const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/allUsers/:id', userCtrl.getAllUsers);
router.get('/profil/:userId', userCtrl.getOneUser)
router.delete('/profil/:userId', userCtrl.deleteOneUser)

module.exports = router;