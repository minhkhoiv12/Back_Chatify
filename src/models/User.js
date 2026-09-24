import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // createdAt & updatedAt
);

// Supports the newest-first Contacts query without scanning the whole collection.
userSchema.index({ createdAt: -1 });

const User = mongoose.model("User", userSchema);

export default User;