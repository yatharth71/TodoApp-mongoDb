const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  desc: String,
});

mongoose.models = {};

export default mongoose.model("Todo", todoSchema);
