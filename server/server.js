const express = require('express');
var cors = require('cors')
const bodyParser = require("body-parser");

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
);
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Rotas da API
app.use("/api/task", require("./controllers/taskController"));
app.use("/api/user", require("./controllers/userController"));
app.use("/api/mensagem", require("./controllers/mensagemController"));

app.listen(port, () => console.log(`Listening on port ${port}`));