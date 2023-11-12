import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	name: { type: "String", required: true },
	username: { type: "String", required: true, unique: true },
	password: { type: "String", required: true },
	status: { type: "Boolean", required: true },
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
