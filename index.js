const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userMiddlewares = require('./middlewares/userMiddlewares')
const tokenMiddleware = require('./middlewares/tokenMiddleware')

const PORT = process.env.PORT || 3001;
const app = express();


app.use(cors());

app.use(bodyParser.json());

const user = require('./controllers/usersController')

app.get('/login', userMiddlewares.validateLogin, user.loginUser)
app.get('/signup', userMiddlewares.validateIfRegisterFieldsExists,  user.createUser)


app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

