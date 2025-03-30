// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");


// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, required: true, unique: true },
//     password: String,
//     resetPasswordToken: String, // Stores reset token
//     resetPasswordExpires: Date, // Stores expiry time
// });

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    resetPasswordToken: String, // Stores reset token
    resetPasswordExpires: Date, // Stores expiry time
    role: { type: String, default: "user" }, // Add role field
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("User", UserSchema);
