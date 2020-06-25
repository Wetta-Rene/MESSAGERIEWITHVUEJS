const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')


router.get('/lastSignup/', auth, adminCtrl.getAllLastSignup); //recupere tous les derniers inscrit
router.get('/lastPosts/', auth, adminCtrl.getAllLastPost); //recupere tous les derniers post sur le wall
router.post('/moderation/:id', auth, adminCtrl.getPostToModerate);  // affiche toutes les discussions de l'utilisateur
router.put('/setupSignup/:id', auth, adminCtrl.setupSignup); // validation des derniers inscrit
router.delete('/deleteSignup/:id', auth, adminCtrl.deleteSetupSignup); // validation des derniers inscrit


module.exports = router;