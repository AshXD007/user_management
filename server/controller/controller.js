var Userdb = require('../model/model');

// create and save new user 
exports.create = (req,res)=>{
    //validate req
    if(!req.body){
        res.status(400).send({
            message:"empty"
        })
        return;
    }

    //new user
    const user = new Userdb({
        name : req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in the database
    user.save(user)
    .then(data =>{
        // res.send(data)
        res.redirect('/add-user')
    })
    .catch(err =>{
        res.status(500).send({
            message:err.message || "error"
        })
    })
}

//retrieve and return all users / single user
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({msg:`no user with id : ${id}`})
            }else{
                res.send(data);
            }
        })
        .catch(err =>{
            res.status(500).send({msg:err.message});
        })
    }else{

        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err =>{
            res.status(500).send({msg:err.message});
        })
    }
}

//update an user by user id 
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({msg:"no data"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data =>{
        if(!data){
            res.status(404).send({msg:`no user with ${id}`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({msg:err.message})
    })
}


//delete a user
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({msg:'no user with id'})
        }else{
            res.send({msg:`user deleted`})
        }
    })
    .catch(err=>{
        res.status(500).send({
            msg:'could not delete '
        })
    })
}