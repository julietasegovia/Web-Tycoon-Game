const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Esto permite que tu React se conecte sin errores
app.use(express.json());

// "Base de datos" temporal en memoria
const users = [];

// Ruta de Registro
app.post('/api/auth/signup', (req, res) => {
  const { username, email, password } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const newUser = { username, email, password };
  users.push(newUser);

  console.log("Nuevo usuario unido a la granja:", newUser);
  
  res.json({ 
    user: { username, email }, 
    token: "fake-jwt-token-123" 
  });
});

// Ruta de Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  res.json({ 
    user: { username: user.username, email: user.email }, 
    token: "fake-jwt-token-123" 
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor de la Granja corriendo en http://localhost:${PORT}`);
});