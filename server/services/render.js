const res = require("express/lib/response");
const axios = require('axios');
// home method get
exports.homeRoutes = (req,res) => {
    // Make a get req to /api/users
    axios.get(`http://localhost:${process.env.PORT}/api/users`)
    .then(function(response){
        res.render("index",{users:response.data});
    })
    .catch(err =>{
        res.send(err);
    })
}

// add user method get
exports.add_user = (req,res) =>{
    res.render('add_user');
}

// update user method get

exports.update_user = (req,res) =>{
    axios.get(`http://localhost:${process.env.PORT}/api/users`,{params:{id:req.query.id}})
    .then(function(userdata){
        res.render('update_user',{user:userdata.data})
    })
    .catch(err =>{
        res.send(err);
    })

}

