const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nama_kuburan: {
    type: String
  },
  alamat_kuburan: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model("kuburan_db", userSchema);
