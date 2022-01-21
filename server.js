const express = require("express");
const morgan = require("morgan");
require('dotenv').config();
const PORT = process.env.PORT || 8090;
const bodyparser = require('body-parser');
const path = require('path');

const app = express();
//log requests
app.use(morgan('tiny'))
//parse req to body parser
app.use(bodyparser.urlencoded({extended:true}));
//set view engine
app.set('view engine','ejs');
//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));



app.get('/' , (req,res) =>{
    res.render("index");
})
app.get('/add-user' , (req,res) =>{
    res.render("add_user");
})
app.get('/update-user' , (req,res) =>{
    res.render("update_user");
})

app.listen(PORT , ()=> console.log(`RUNNING ON http://localhost:${PORT}/`));