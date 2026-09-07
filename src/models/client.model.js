import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "customer"],
      default: "new",
    },
  },
  {
    timestamps: true,
  },
);

const ClientModel = mongoose.model("Client", clientSchema);

export default ClientModel;