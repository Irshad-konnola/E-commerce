const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json({limit:"10mb"}))


const PORT = process.env.PORT || 8070
// mongodb connection
console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery",false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("connect to database"))
.catch((err)=>console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type:String,
        unique:true,
    },
    password: String,
    confirmPassword: String,
    image : String,
}) 

// model
 const userModel =  mongoose.model("user",userSchema)




//api

app.get("/",(req,res)=>{
    res.send("server is running ")
})
// signup
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
  
    try {
      const result = await userModel.findOne({ email: email });
      console.log(result);
      if (result) {
        res.send({ message: "Email id is already registered",alert:false });
      } else {
        const data = userModel(req.body);
        const save = await data.save();
        res.send({ message: "successfully signed up",alert:true});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  });

  // login
  app.post("/login", (req, res) => {
    console.log(req.body);
    const { email } = req.body;
  
    userModel.findOne({ email: email })
      .then((result) => {
        if (result) {
          const dataSend = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            image: result.image,
          };
          console.log(dataSend)
          res.send({ message: "login is successful", alert: true,data:dataSend });
        } else {
          res.send({ message: "user not found", alert: false });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "internal server error", alert: false });
      });
  });

  // product section
  const schemaProduct = mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price:String,
    description:String,
  });

  const productModel = mongoose.model("product",schemaProduct)

  //save product in data
  // api 
app.post("/uploadProduct",async(req,res)=>{ 
  console.log(req.body);
  const data = await productModel(req.body)
  const dataSave = await data.save()
  res.send({message:"upload completed"})
})
  
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})

app.listen(PORT,()=>console.log("server running at port : " + PORT))
