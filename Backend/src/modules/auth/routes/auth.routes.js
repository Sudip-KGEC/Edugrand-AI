import { Router } from "express";
import {
  sendOtpController,
  verifyOtpController,
  completeProfileController,
  refreshTokenController,
  logoutController,
  logoutAllController,
  getMeController,
  updateProfileController,
} from "../controllers/auth.controller.js";
import { protect } from "../../../middlewares/auth.middleware.js";

const router = Router();

router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/complete-profile", completeProfileController);

router.post("/refresh", refreshTokenController);

router.post("/logout",  logoutController);
router.post("/logout-all", protect, logoutAllController);

router.get("/profile", protect, getMeController);
router.put("/update-profile", protect, updateProfileController);

export default router;