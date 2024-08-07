import mongoose from "mongoose";

const img = new mongoose.Schema({
   name:{
      type:String,
      required:true
   }
});
const images = mongoose.model('images',img);
export default images;