const express = require('express');
require('dotenv').config();
const models = require('./src/model/model');
const sequelize = require('./src/config/db_config');
const router = require('./src/router/index');
const cors = require('cors');
const errorHandler = require('./src/middleweare/ErrorHandlingMiddleweare');
const port = process.env.PORT_PROD || 3000; // Убедитесь, что порт задан
const app = express();


// telegram
const telegrambot = require('./telegram')


app.use(cors());
app.use(express.json());
app.use('/', router);
// app.use(errorHandler);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

const start = async () => {
    try {
        console.log('Connecting to the database...');
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        await sequelize.sync();
        console.log('Database synchronized successfully.');

        app.listen(port, () => console.log('Server running on port ' + port));
    } catch (error) {
        console.error('Error starting server:', error); // Вывод полного объекта ошибки
    }
};

start()
