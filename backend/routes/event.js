import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import {
  createEvent,
  getAllEvents,
  getEventDetails,
  updateEvent,
  deleteEvent,
  getMyEvents,
} from "../controllers/event.js";
const router = express.Router();

router.post("/new", isAuthenticated, singleUpload, createEvent);
router.get("/all", getAllEvents);
router.get("/myevents", isAuthenticated, getMyEvents);

router
  .route("/:id")
  .get(getEventDetails)
  .put(isAuthenticated, updateEvent)
  .delete(isAuthenticated, deleteEvent);

export default router;
