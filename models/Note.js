const mongoose = require("mongoose");
// const User = require("../models/User");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
  description: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

const Notes = mongoose.model("notes", NotesSchema);

module.exports = Notes;
