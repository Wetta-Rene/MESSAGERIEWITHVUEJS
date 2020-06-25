const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log("Token recu: "+req.headers.authorization)
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  //-> changer clef token (voir dans frontend aussi avec .env)
    const userId = decodedToken.userId;

    console.log("- - - - - - - - -")
    console.log("authorization: "+token)
    console.log("DecodedToken: "+decodedToken)
    console.log("usereIdFromToken: "+decodedToken.userId)
    console.log("req.body.userId: "+req.body.userId)

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};