const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const segredo = process.env.SECRETPASSWORD;

  if (!token) {
      return res.status(401).json({ message: 'Token invalido, necessário fazer o login novamente' });
    }
    try {
      const decoded = jwt.verify(token, segredo);
      const userWithoutPassword = {
          username: decoded.payload.email,
          role: decoded.payload.role,
          userId: decoded.payload.userId,
      };
        req.user = userWithoutPassword;
        // console.log(req.user, 'decoded', decoded);

        next();
} catch (err) {
  return res.status(401).json({ err: TOKEN_ERROR_MSG });
}
};

module.exports= {validateToken }