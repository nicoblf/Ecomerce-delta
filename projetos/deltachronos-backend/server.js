// Arquivo final completo: /deltachronos-backend/server.js

// @ts-nocheck
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./authenticateToken');
const { JWT_SECRET } = require('./config');

const app = express();
const PORT = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'deltachronos_db',
  password: 'Nicolas.438',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// --- ROTAS PÚBLICAS ---

// ROTA PRINCIPAL DE PRODUTOS - COM FILTROS E ORDENAÇÃO DINÂMICOS
app.get('/api/products', async (req, res) => {
    const { sort, category, price } = req.query;

    let queryText = 'SELECT * FROM produtos';
    const values = [];
    const whereClauses = [];
    let paramIndex = 1;

    // Lógica de Filtro
    if (category) {
        const categories = Array.isArray(category) ? category : [category];
        if (categories.length > 0) {
            whereClauses.push(`categoria = ANY($${paramIndex++})`);
            values.push(categories);
        }
    }

    if (price && price !== 'all') {
        const [min, max] = price.split('-').map(Number);
        whereClauses.push(`preco BETWEEN $${paramIndex++} AND $${paramIndex++}`);
        values.push(min, max);
    }
    
    if (whereClauses.length > 0) {
        queryText += ' WHERE ' + whereClauses.join(' AND ');
    }

    // Lógica de Ordenação
    let orderByClause = 'ORDER BY id ASC';
    switch (sort) {
        case 'price_asc':
            orderByClause = 'ORDER BY preco ASC';
            break;
        case 'price_desc':
            orderByClause = 'ORDER BY preco DESC';
            break;
        case 'newest':
            orderByClause = 'ORDER BY created_at DESC';
            break;
    }
    queryText += ` ${orderByClause}`;

    try {
      console.log('Executando Query:', queryText, 'com valores:', values);
      const products = await pool.query(queryText, values);
      res.status(200).json(products.rows);
    } catch (error) {
      console.error('Erro ao buscar produtos com filtros:', error);
      res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
    if (product.rows.length === 0) { return res.status(404).json({ message: 'Produto não encontrado.' }); }
    res.status(200).json(product.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) { return res.status(400).json({ message: 'O termo de busca é obrigatório.' }); }
    const queryText = `SELECT * FROM produtos WHERE nome ILIKE $1 OR descricao ILIKE $1 ORDER BY id;`;
    const values = [`%${q}%`];
    const results = await pool.query(queryText, values);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error('Erro na busca:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});


// --- ROTAS DE AUTENTICAÇÃO ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, cpf, birthDate, gender, phone, accountType, companyName, cnpj } = req.body;
    if (!email || !password || !accountType) { return res.status(400).json({ message: 'Campos essenciais são obrigatórios.' }); }
    const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1 OR cpf = $2 OR cnpj = $3', [email, cpf, cnpj]);
    if (userExists.rows.length > 0) { return res.status(409).json({ message: 'Email, CPF ou CNPJ já cadastrado.' }); }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const queryText = `INSERT INTO usuarios(email, password_hash, nome, cpf, data_nascimento, genero, telefone, tipo_conta, razao_social, cnpj) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, email, nome, tipo_conta;`;
    const values = [email, hashedPassword, name || null, cpf || null, birthDate || null, gender || null, phone || null, accountType, companyName || null, cnpj || null];
    const newUser = await pool.query(queryText, values);
    res.status(201).json({ message: 'Utilizador criado com sucesso!', user: newUser.rows[0] });
  } catch (error) {
    console.error('Erro no registo:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) { return res.status(401).json({ message: 'Credenciais inválidas.' });}
    const userResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userResult.rows.length === 0) { return res.status(401).json({ message: 'Credenciais inválidas.' }); }
    const user = userResult.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordCorrect) { return res.status(401).json({ message: 'Credenciais inválidas.' }); }
    const token = jwt.sign({ id: user.id, email: user.email, nome: user.nome, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    res.status(200).json({ message: 'Login bem-sucedido!', token: token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});


// --- ROTAS DO UTILIZADOR (Protegidas) ---
app.post('/api/user/change-password', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  try {
    const userResult = await pool.query('SELECT * FROM usuarios WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) { return res.status(404).json({ message: 'Utilizador não encontrado.' }); }
    const user = userResult.rows[0];
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isPasswordCorrect) { return res.status(403).json({ message: 'A senha atual está incorreta.' }); }
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    await pool.query('UPDATE usuarios SET password_hash = $1 WHERE id = $2', [hashedNewPassword, userId]);
    res.status(200).json({ message: 'Senha alterada com sucesso!' });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userResult = await pool.query('SELECT id, nome, email, cpf, data_nascimento, genero, telefone, tipo_conta, razao_social, cnpj, role FROM usuarios WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Utilizador não encontrado.' });
    }
    res.status(200).json(userResult.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar perfil do utilizador:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { nome, telefone } = req.body;
    const fields = [];
    const values = [];
    let queryIndex = 1;
    if (nome) { fields.push(`nome = $${queryIndex++}`); values.push(nome); }
    if (telefone) { fields.push(`telefone = $${queryIndex++}`); values.push(telefone); }
    if (fields.length === 0) { return res.status(400).json({ message: 'Nenhum dado para atualizar.' }); }
    values.push(userId);
    const queryText = `UPDATE usuarios SET ${fields.join(', ')} WHERE id = $${queryIndex} RETURNING *`;
    const updatedUser = await pool.query(queryText, values);
    res.status(200).json({ message: 'Dados atualizados com sucesso!', user: updatedUser.rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});


// --- NOVAS ROTAS PARA GERIR ENDEREÇOS (Protegidas) ---
app.get('/api/user/addresses', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await pool.query('SELECT * FROM enderecos WHERE user_id = $1 ORDER BY is_principal DESC, created_at DESC', [userId]);
    res.status(200).json(addresses.rows);
  } catch (error) {
    console.error('Erro ao buscar endereços:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.post('/api/user/addresses', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { cep, rua, numero, complemento, bairro, cidade, estado } = req.body;
    if (!cep || !rua || !numero || !bairro || !cidade || !estado) { return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' }); }
    const queryText = `INSERT INTO enderecos(user_id, cep, rua, numero, complemento, bairro, cidade, estado) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
    const values = [userId, cep, rua, numero, complemento || null, bairro, cidade, estado];
    const newAddress = await pool.query(queryText, values);
    res.status(201).json(newAddress.rows[0]);
  } catch (error) {
    console.error('Erro ao adicionar endereço:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.delete('/api/user/addresses/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;
    const result = await pool.query('DELETE FROM enderecos WHERE id = $1 AND user_id = $2', [addressId, userId]);
    if (result.rowCount === 0) { return res.status(404).json({ message: 'Endereço não encontrado ou não pertence a este utilizador.' }); }
    res.status(200).json({ message: 'Endereço apagado com sucesso.' });
  } catch (error) {
    console.error('Erro ao apagar endereço:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor backend a rodar na porta http://localhost:${PORT}`);
});