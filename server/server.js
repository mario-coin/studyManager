const express = require('express');
// const { User } = require('../client/models');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/mensagem', (req, res) => {
  // User.create({ name: 'Mario Coin', email: 'marioquercafe@gmail.com', password: '123456' });
  res.send({ express: 'let the games begin' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));