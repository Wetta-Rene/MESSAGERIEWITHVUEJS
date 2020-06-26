const express = require('express');
const router = express.Router();

const disCtrl = require('../controllers/discussion');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config') // pour les images


router.get('/:userId', auth,  disCtrl.getAllDiscussions);  // affiche toutes les discussions de l'utilisateur
router.get('/read/:discussion', auth, disCtrl.getAllMessages);  // affiche tous les messages de la discussion choisi
router.post('/new', auth, disCtrl.createDiscussion);  // cree une nlle discussion
router.delete('/:idDiscussion', auth, disCtrl.deleteDiscussionAndMessages);  // supprimer la discussion et les messages de la discussion


router.put('/:id', auth, multer, disCtrl.modifySauce); // pour mettre a jour l'objet suivant user identifier



module.exports = router;