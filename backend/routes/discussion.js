const express = require('express');
const router = express.Router();

const disCtrl = require('../controllers/discussion');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')


router.get('/', disCtrl.getAllDiscussions);  // afficher toutes les sauces de la base Mongo
router.get('/:id', auth, disCtrl.getOneSauce);  // afficher une sauce unique
router.post('/', auth, multer, disCtrl.createSauce);  // creer un nouvel objet sauce
router.put('/:id', auth, multer, disCtrl.modifySauce); // pour mettre a jour l'objet suivant user identifier
router.delete('/:id', auth, disCtrl.deleteSauce);  // supprimer la sauce choisie


module.exports = router;