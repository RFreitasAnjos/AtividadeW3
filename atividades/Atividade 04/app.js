const express = require("express");
const router = require("./routes/router.js");
const sequelize = require('.')
const db = require("./db/index.js");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*--------------------------------------------------*/
app.use(router);

app.listen(3000, console.log(`Server is running on port ${3000}`));
