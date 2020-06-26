const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  //-> changer clef token (voir dans frontend aussi avec .env)
    const userId = String(decodedToken.userId); // forcer en string comme decodedToken pour que tout soit pareil a la comparaison
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};