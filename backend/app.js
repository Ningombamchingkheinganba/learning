const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Contact = require("./model/contact");


mongoose.connect("mongodb://localhost:27017", {
    dbName: "my-angular-learning"
}).then(()=> {
    console.log("connected to database");
}).catch(() => {
    console.log("connection Failed");
    
})

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept , Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS, PUT"
    );
    next();
});

app.post("/api/contact/addcontact", (req, res, next) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    })
    contact.save().then(()=>{
        res.status(201).json({
            message: "Contact add Successfully"
        })
    })
})

app.get("/api/contact/getContact", (req, res, next) => {
    Contact.find().then(contact => {
        if(contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({
                message: "Contact not found!"
            })
        }
    }).catch((error) => {
        res.status(500).json({
            message: "Fetching contact failed!"
        })
    })
})

app.delete("/api/contact/deleteContact/:id", (req, res, next) => {
    Contact.deleteOne({_id: req.params.id}).then((result)=>{
        if(result.deletedCount > 0) {
            res.status(200).json({
                message: "Delete contact successfully"
            })
        } else {
            res.status(400).json({
                message: "Not authorized"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "contact delete failed"
        })
    })
})

module.exports = app;