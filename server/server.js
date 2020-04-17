const express = require('express');
var cors = require('cors')
const bodyParser = require("body-parser");

// const { User } = require('../database/models');

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
);
const port = process.env.PORT || 5000;

// app.get('/api/mensagem', (req, res) => {
//   // User.create({ name: 'Mario Coin', email: 'marioquercafe@gmail.com', password: '123456' });
//   res.send({ express: 'let the games begin' });
// });

app.use(bodyParser.json());

// Rotas da API
app.use("/api/user", require("./controllers/userController"));
app.use("/api/mensagem", require("./controllers/mensagemController"));

app.listen(port, () => console.log(`Listening on port ${port}`));