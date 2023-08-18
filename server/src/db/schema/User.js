import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  role: {
    type: Number,
    default: 0,
    // 0 - user
    // 1 - moderator
    // 2 - admin
  },

  cartProduct: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// virtual properties
UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual("initials").get(function () {
  return `${this.firstName[0]} ${this.lastName[0]}`;
});

export const User = mongoose.model("User", UserSchema);
