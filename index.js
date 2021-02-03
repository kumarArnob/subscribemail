//jshint exversion:6

const express = require("express");
const BodyParser =require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
//for static Files handling
app.use(express.static("public"));

app.use(BodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    
    var email = req.body.email;
    //var pass = req.body.pass;

    var data ={
        members :[
            {
              email_address :email,
              status :"subscribed",
              marge_fields:{
                  FNAME :fname,
                  LNAME:lname
              }

            }
        ]
    };
    var jsonData=JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/334aee66cf";

    const options = {
        method :"POST",
        auth : "Arnob:1463864afef5dfd71615e7b3d268ed82-us7"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode ===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });

    });
    request.write(jsonData);
    request.end();


});

app.post("/success",function(req,res){
    res.redirect("/");

})

app.listen(process.env.PORT||3000,()=>{
    console.log("Server is running @3000");
})

//
//list id
//334aee66cf