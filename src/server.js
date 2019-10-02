const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose')

const cors = require('cors')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3333;

const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;
const dbCluster = process.env.DB_CLUSTER;

const dbCntStr = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}-mkbtw.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(dbCntStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Backend is running at http://localhost:${port}`)
});
