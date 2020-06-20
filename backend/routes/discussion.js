const express = require('express');
const router = express.Router();

const disCtrl = require('../controllers/discussion');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')


router.get('/:userId', disCtrl.getAllDiscussions);  // affiche toutes les discussions de l'utilisateur
router.get('/read/:discussion', disCtrl.getAllMessages);  // affiche tous les messages de la discussion choisi
router.post('/new', disCtrl.createDiscussion);  // cree une nlle discussion
router.delete('/:idDiscussion', disCtrl.deleteDiscussionAndMessages);  // supprimer la discussion et les messages de la discussion

router.put('/:id', auth, multer, disCtrl.modifySauce); // pour mettre a jour l'objet suivant user identifier



module.exports = router;