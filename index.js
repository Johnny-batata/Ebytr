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
const tasks = require('./controllers/tasksController')

app.post('/login', userMiddlewares.validateLogin, user.loginUser)
app.post('/signup', userMiddlewares.validateIfRegisterFieldsExists,  user.createUser)

app.put('/tasks', tokenMiddleware.validateToken,  tasks.updateTask)
app.get('/tasks', tokenMiddleware.validateToken,  tasks.getAllTasks)
app.post('/tasks', tokenMiddleware.validateToken,  tasks.createTask)
app.delete('/tasks/:id', tokenMiddleware.validateToken,  tasks.removeTask)


app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

