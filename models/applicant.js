const mongoose = require("mongoose");

const bcrypt = require("bcrypt-nodejs");
salt_factor = 8;

mongoose.set("useCreateIndex", true);

const applicantSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  regno: {
    type: String,
    unique: true
  },
  phone: Number,
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "female"
  },
  domain: [String],
  ansTech: [String],
  ansDesign: [String],
  ansMgt: [String],
  role: {
    type: String,
    enum: ["admin", "public"],
    default: "public"
  },
  status: {
    type: String,
    enum: ["approved", "reject", "hold"],
    default: "hold"
  },
  check: String
});

applicantSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(salt_factor), null);
};
module.exports = mongoose.model("applicant", applicantSchema);
