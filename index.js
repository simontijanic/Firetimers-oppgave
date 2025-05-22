require('dotenv').config(); 
const express = require('express');
const itemRouter = require('./router/itemRouter');
const statusRouter = require('./router/statusRouter');
const logger = require('./middleware/logger');

const app = express();
const port = process.env.PORT || 3000;

const connectToDatabase = require('./config/database');
connectToDatabase.connectToDatabase()

app.use(express.json());
app.use(logger); 

app.use('/items', itemRouter);
app.use('/status', statusRouter);

app.listen(port, () => {
    console.log(`Server lytter på port`);
});