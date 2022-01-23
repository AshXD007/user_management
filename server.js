const express = require("express");
const morgan = require("morgan");
require('dotenv').config();
const PORT = process.env.PORT || 8090;
const bodyparser = require('body-parser');
const path = require('path');
//mongo connection
const connectDB = require(`./server/database/connection`);

const app = express();
//log requests
app.use(morgan('tiny'))

//connect db
connectDB();
//parse req to body parser
app.use(bodyparser.urlencoded({extended:true}));
//set view engine
app.set('view engine','ejs');
//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//load router
app.use('/',require('./server/routes/router'));



app.listen(PORT , ()=> console.log(`RUNNING ON http://localhost:${PORT}/`));