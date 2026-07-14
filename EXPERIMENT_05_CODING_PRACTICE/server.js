const express = require("express"),
      fs = require("fs"),
      cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/tasks",(req,res)=>
    res.json(JSON.parse(fs.readFileSync("tasks.json")))
);

app.post("/tasks",(req,res)=>{
    fs.writeFileSync("tasks.json",JSON.stringify(req.body,null,2));
    res.sendStatus(200);
});

app.listen(3000,()=>console.log("Server Running at http://localhost:3000"));