import { Router } from "express";
import * as controller from "../controllers/scholarship.controller.js";
import { protect, restrictTo } from "../../../middlewares/auth.middleware.js";
import {
  validateCreateScholarship,
  validateApply,
  validateStatusUpdate,
  validateUpdateScholarship
} from "../middleware/scholarship.validate.js";

const router = Router();

router.get("/", controller.getScholarships);

router.use(protect);

router.post(
  "/apply",
  restrictTo("student"),
  validateApply,
  controller.applyToScholarship
);

router.get(
  "/my-applications",
  restrictTo("student"),
  controller.getMyApplications
);

router.post(
  "/",
  restrictTo("admin"),
  validateCreateScholarship,
  controller.addScholarship
);

router.get(
  "/admin",
  restrictTo("admin"),
  controller.getAdminScholarships
);

router.get(
  "/admin/applications",
  restrictTo("admin"),
  controller.getAdminApplications
);

router.patch(
  "/admin/applications/:id/status",
  restrictTo("admin"),
  validateStatusUpdate,
  controller.updateApplicationStatus
);

router.patch(
  "/:id",
  restrictTo("admin"),
  validateUpdateScholarship,
  controller.editScholarship
);

router.delete(
  "/:id",
  restrictTo("admin"),
  controller.deleteScholarship
);

export default router;