const mongoose = require("mongoose");

const aadhaarSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Aadhaar = mongoose.model('Aadhaar', aadhaarSchema);

module.exports = Aadhaar;