import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

dotenv.config();


const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: process.env.SECRETS_DB,
    port: 5432


});


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/",  async (req, res) => {
      res.render("index.ejs");
      
  });
  



app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      });
          