const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  issues: {
    type: Number,
   
  },
  resolved: {
    type: Number,

  },
  comment: {
    type: Number,
 
  },
  progress: {
    type: Number,
  
  },
});


module.exports = mongoose.model("Todo", todoSchema);
