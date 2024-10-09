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
    validate: {
      validator: function (value) {
        // price should be 0 or undefined if ticket type is free
        return this.ticketType === "Free" ? value === 0 || value === undefined : value > 0;
      },
      message: "Price must be 0 if ticket type is free.",
    },
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
    required: function () {
      return this.capacity === "Limited";
    },
    validate: {
      validator: function (value) {
        return this.capacity === "Unlimited" ? value === 0 : value > 0;
      },
      message: "Max capacity must be 0 if the capacity is set to unlimited, or more than 0 if the capacity is set to limited.",
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
  ]
});

export const Event = mongoose.model("Event", schema);
