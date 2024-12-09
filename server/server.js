import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.listen(port, () => {
    console.log(`serwer nasłuchuje na porcie ${port}`)
})

const client = new MongoClient("mongodb://d234:Ezs8Kpu6GR@mongodb.mikr.dev:27017/db_d234");
client.connect();
const db = client.db("db_d234");
let movies = db.collection("movies");
let rents = db.collection("rents");
let users = db.collection("users")

app.get("/",(req,res)=>{
    res.send("dzień dobry");
})

app.get("/moviesApi", async (req, res) => {
    try {
        const result = await movies.find({}).toArray();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Błąd serwera");
    }
});

app.get("/rentsApi", async (req, res) => {
    try {
        const result = await rents.find({}).toArray();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Błąd serwera");
    }
});

app.get("/usersApi", async (req, res) => {
    try {
        const result = await users.find({}, { projection: { "password": 0 } }).toArray();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Błąd serwera");
    }
});

app.post("/reg", async (req, res) => {
    const { regEmail, regPassword } = req.body;

    try {
        const result = await users.insertOne({
            "email": regEmail,
            "password": regPassword
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Błąd serwera" });
    }

    res.status(200).json({ message: "działa" })
})

app.post("/deleteaccount", async (req, res) => {
    const { email } = req.body;

    try {
        const result = await users.deleteOne({
            "email": email
        })
        
        res.status(200).json({message: "usunięto użytkownika"})

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "coś nie działa na serwerze" })
    }

    console.log(email);
})

app.post("/addmovie",async (req,res)=>{
    const {title, type,director, desc} = req.body;

    try{
        const result = await movies.insertOne({
            "tytul": title,
            "gatunek": type,
            "rezyser": director,
        })

    } catch(err){
        console.log(err);
        res.status(500).json({message:"Błąd po stronie serwera"})
    }
})

app.post("/updatedata", async (req,res)=>{
    const {email,data,value} = req.body;

    try{
        switch(data){
            case 'email':{
                const result = await users.updateOne(
                    {email:email},
                    {$set: {email:value}}
                )
            } break;
            case 'name':{
                const result = await users.updateOne(
                    {email:email},
                    {$set: {name:value}}
                )
            } break;
            case 'surname':{
                const result = await users.updateOne(
                    {email:email},
                    {$set: {surname:value}}
                )
            } break;
            case 'password':{
                const result = await users.updateOne(
                    {email:email},
                    {$set: {password:value}}
                )
            } break;
        }

        res.status(200).json({message: "edytowano użytkownika"})

    } catch(err){
        console.log(err);
        res.status(500).json({message:"Błąd po stronie serwera"})
    }
})