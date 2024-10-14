import { asyncError } from "../middlewares/error.js";
import { Event } from "../models/event.js";
import ErrorHandler from "../utils/error.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/features.js";

export const createEvent = asyncError(async (req, res, next) => {
  const {
    name,
    startDate,
    endDate,
    location,
    description,
    ticketType,
    capacity,
    maxCapacity,
    price,
  } = req.body;

  if (!req.file) return next(new ErrorHandler("Please add image", 400));

  const file = getDataUri(req.file);
  const myCloud = await cloudinary.v2.uploader.upload(file.content, {
    folder: "events",
  });
  const image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await Event.create({
    name,
    startDate,
    endDate,
    location,
    description,
    organizer: req.user._id,
    price,
    ticketType,
    capacity,
    maxCapacity,
    images: [image],
  });

  res.status(200).json({
    success: true,
    message: "Event Created Succesfully",
  });
});

export const getAllEvents = asyncError(async (req, res, next) => {
  const events = await Event.find({});

  res.status(200).json({
    success: true,
    events,
  });
});

export const getEventDetails = asyncError(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) return next(new ErrorHandler("Event not found", 404));

  res.status(200).json({
    success: true,
    event,
  });
});

export const getMyEvents = asyncError(async (req, res, next) => {
  const events = await Event.find({ organizer: req.user._id }).populate(
    "organizer",
    "name"
  );

  if (!events || events.length === 0)
    return next(new ErrorHandler("Event not found", 404));

  res.status(200).json({
    success: true,
    events,
  });
});

export const updateEvent = asyncError(async (req, res, next) => {
  const {
    name,
    startDate,
    endDate,
    location,
    description,
    price,
    ticketType,
    capacity,
    maxCapacity,
  } = req.body;

  const event = await Event.findById(req.params.id);

  if (!event) return next(new ErrorHandler("Event not found", 404));

  if (
    event.organizer.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorHandler("You are not authorized to update this event", 403)
    );
  }

  if (name) event.name = name;
  if (startDate) event.startDate = startDate;
  if (endDate) event.endDate = endDate;
  if (location) event.location = location;
  if (description) event.description = description;
  if (price) event.price = price;
  if (ticketType) event.ticketType = ticketType;
  if (capacity) event.capacity = capacity;
  if (maxCapacity) event.maxCapacity = maxCapacity;

  // Handle image update
  if (req.file) {
    // Delete old image from Cloudinary
    if (event.images.length > 0) {
      await cloudinary.v2.uploader.destroy(event.images[0].public_id);
    }

    // Upload new image to Cloudinary
    const file = getDataUri(req.file);
    const myCloud = await cloudinary.v2.uploader.upload(file.content, {
      folder: "events",
    });
    const newImage = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    // Update images array
    event.images = [newImage];
  }

  await event.save();

  res.status(200).json({
    success: true,
    message: "Event Updated Successfully",
  });
});

export const deleteEvent = asyncError(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) return next(new ErrorHandler("Event not found", 404));

  if (
    event.organizer.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorHandler("You are not authorized to delete this event", 403)
    );
  }

  for (let index = 0; index < event.images.length; index++) {
    await cloudinary.v2.uploader.destroy(event.images[index].public_id);
  }
  await event.deleteOne();

  res.status(200).json({
    success: true,
    message: "Event Deleted Successfully",
  });
});
