// controllers/authController.js
const { login } = require('../services/authService');

exports.loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await login(username, password);
    res.json({ user: { id: user.idUser, username: user.username }, token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message });
  }
};
