const express = require('express');
const router = express.Router();

const wallCtrl = require('../controllers/wall');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config') //pour les images


router.get('/', auth, wallCtrl.getAllTheWall);  // affiche toutes les publications du mur de l'entreprise
router.post('/', auth, multer, wallCtrl.newPost); // enregistrement d'un nouveau post sur le wall

/*
router.get('/read/:discussion', disCtrl.getAllMessages);  // affiche tous les messages de la discussion choisi
router.post('/new', disCtrl.createDiscussion);  // cree une nlle discussion
router.delete('/:idDiscussion', disCtrl.deleteDiscussionAndMessages);  // supprimer la discussion et les messages de la discussion

router.put('/:id', auth, multer, disCtrl.modifySauce); // pour mettre a jour l'objet suivant user identifier
*/


module.exports = router;