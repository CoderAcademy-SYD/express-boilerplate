const UserSchema = require("./../schemas/user_schema");
const mongoose = require("mongoose");

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;