import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ticketType: {
    type: String,
    enum: ["Free", "Paid"],
    required: true,
  },
  capacity: {
    type: String,
    enum: ["Unlimited", "Limited"],
    required: true,
  },
  maxCapacity: {
    type: Number,
    validate: {
      validator: function (value) {
        // maxCapacity should only be defined when capacity is 'limited'
        return this.capacity === "Limited" ? value > 0 : value === undefined;
      },
      message:
        "Max capacity must be more than 0 if the capacity is set to limited.",
    },
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Event = mongoose.model("Event", schema);
