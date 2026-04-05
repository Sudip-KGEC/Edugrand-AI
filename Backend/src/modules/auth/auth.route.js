import { Router } from "express";
import * as authController from "./auth.controller.js";
import { protect } from "../../app/middlewares/auth.middleware.js";

const router = Router();

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/complete-profile", authController.completeProfile);

router.post("/logout", authController.logout);

router.get("/profile", protect, authController.getProfile);
router.put("/update-profile", protect, authController.updateProfile);

export default router;