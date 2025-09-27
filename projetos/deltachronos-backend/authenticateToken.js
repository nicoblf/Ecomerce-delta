// Arquivo: authenticateToken.js (Corrigido)

const jwt = require('jsonwebtoken');
// Pega a chave secreta do nosso ficheiro de configuração central
const { JWT_SECRET } = require('./config');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Erro na verificação do JWT:", err.message);
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;