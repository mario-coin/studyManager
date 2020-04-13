const express = require('express');
const bodyParser = require("body-parser");

// const { User } = require('../client/models');

const app = express();
const port = process.env.PORT || 5000;

// Carrega o model de Usuário
// require("./api/user");

// app.get('/api/mensagem', (req, res) => {
//   // User.create({ name: 'Mario Coin', email: 'marioquercafe@gmail.com', password: '123456' });
//   res.send({ express: 'let the games begin' });
// });

app.use(bodyParser.json());

// Rotas da API
// app.use("/api/user", require("./controllers/userController"));
app.use("/api/mensagem", require("./controllers/mensagemController"));

app.listen(port, () => console.log(`Listening on port ${port}`));