const router = require('express').Router();
const path = require('path');

const mongoose = require('mongoose');
const user = require('./schema/userSchema');

router.get('', (req,res)=>{
    mongoose.connect(
        "mongodb+srv://stageus:1234@cluster0.4hvpo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    /*.then(()=>{
        console.log("Mongodb is starter");

        const User = new user({
            id: "stageus",
            pw: "1234"
        })
        
        User.save((error,data)=>{ //db에 저장
            if(error){
                console.log(error);
            } else{
                console.log("is saved");
            }
        })
    })*/
    .then(()=>{
        user.find((error,data)=>{
            if(error){
                console.log(error);
            } else{
                console.log(data);
            }
        })
    })
    .catch((error)=>{
        console.log(error);
    })
});

module.exports = router;