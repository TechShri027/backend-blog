const express=require('express')
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const path = require("path");
const app=express()
app.use(cors({
  origin: [
    "https://mernblogpanel.netlify.app/",
    "http://localhost:5173"
  ],
  credentials: true
}));           
app.use(express.json()); 


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
  
app.listen(5000,()=>{
    console.log("app is running on 5000")
})