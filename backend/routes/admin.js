const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')


router.get('/lastSignup/', auth, adminCtrl.getAllLastSignup);
router.get('/moderation/:id', auth, adminCtrl.getPostToModerate);  // affiche toutes les discussions de l'utilisateur
router.put('/setupSignup/:id', auth, adminCtrl.setupSignup); // validation des derniers inscrit
router.delete('/deleteSignup/:id', auth, adminCtrl.deleteSetupSignup); // validation des derniers inscrit

module.exports = router;