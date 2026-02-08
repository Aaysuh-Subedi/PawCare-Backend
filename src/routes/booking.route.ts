import { Router } from "express";
import BookingController from "../controller/booking.controller";

const router = Router();

router.post("/", BookingController.create);
router.get("/", BookingController.list);
router.get("/:id", BookingController.getById);
router.put("/:id", BookingController.update);
router.delete("/:id", BookingController.remove);

// bookings by user
router.get("/user/:userId", BookingController.listByUser);

export default router;
