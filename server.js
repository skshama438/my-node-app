const express=require("express");
const cors=require("cors");
const mysql=require("mysql2");
const app=express();
const path = require("path");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "applicationform.html"));
});
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
app.get("/test", (req, res) => {
    res.send("Server is working 🎉");
});
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Shama123@",
    database:"project",
});
db.connect((err)=>{
    if (err){
        console.log(err);
    }else{
        console.log("database connected sucessfully");
    }
});
app.post("/apply", (req, res) => {

    console.log(req.body);

    const {
        address,
        fname,
        lname,
        email,
        phonetype,
        phone,
        gender,
        skills,
        languages,
        about
    } = req.body;

    const sql = `
        INSERT INTO application
        (address, first_name, last_name, email, phone_type, phone, gender, skills, languages, about)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        address,
        fname,
        lname,
        email,
        phonetype,
        phone,
        gender,
        skills,
        languages,
        about
    ], (err, result) => {

        if (err) {
            console.log("DB ERROR:", err);
            return res.send(err.sqlMessage || err.message);
        }

        res.send("Application submitted successfully 🎉");

    });

});