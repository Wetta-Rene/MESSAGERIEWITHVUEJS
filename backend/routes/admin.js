const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')


router.get('/lastSignup/', adminCtrl.getAllLastSignup);
router.get('/moderation/:id', adminCtrl.getPostToModerate);  // affiche toutes les discussions de l'utilisateur



module.exports = router;