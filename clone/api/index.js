import mongoose from "mongoose";
import express from "express";
import images from "./models/image.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import multer from "multer"
const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();
const PORT = process.env.PORT||8000; // Change the port number here

app.get('/', (req, res) => {
    res.send('Hello World!');
  });
 
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json());
    //const ser = process.env.MONGO;
    
    const conn =   async ()=>{
  try{
            console.log("how");
           await  mongoose.connect("mongodb+srv://shahidiqbal63209:Shahid786@cluster0.lbxy9hu.mongodb.net/");
            console.log("database was connected");}
        catch(err){  
            console.log("database was disconnected");
    
        };
    }
 // Call the connection function

app.listen(PORT, () => {
    conn();
    console.log(`Server is running on port ${PORT}`);
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination folder where images will be stored
      cb(null, './public');
    },
    filename: function (req, file, cb) {
      // Use the original filename provided by the user
      cb(null, file.originalname);
    }
  });
  
  // Initialize multer with custom storage options
  const upload = multer({ storage: storage });
app.post("/images1",upload.single("image"),async (req,res)=>{
  console.log("kutte");
  console.log(req.body);
    try {
        // Create a new Image document
        console.log("kutte");
        console.log(req.file);
    
        const newImage = new images({
         
          name: req.file.originalname,
        
        });
        
        // Save the image to the database
        await newImage.save();
        console.log("hello");
        //res.set("Content-Type", "image/jpeg"); // Set the content type to JPEG image
res.status(200).send(newImage); // Send the image buffer

      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Error uploading image');
      }
})  
app.get("/images1",async (req,res)=>{
    try{   
     
     //console.log(userId)
     console.log("juio","shahid");
     const img = await images.find();
    console.log(img,"hello");
     if (!img) {
       return res.status(404).json({ message: "Image not found" });
     }
 
     console.log(img,"sh");
     //res.set("Content-Type", "image/jpeg");
     res.status(200).json(img);
    
     //console.log("kon")
   }
   catch(err){
       res.status(500).json({ message: "Error retrieveing" });
   }
 })