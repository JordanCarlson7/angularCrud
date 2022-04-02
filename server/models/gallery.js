const mongoose = require("mongoose");

const { Schema } = mongoose;

const photoSchema = new Schema({
  id: { type: Number, required: false },
  blog: { type: String, required: false },
});

module.exports = mongoose.model("Photo", photoSchema);
