import { Router } from "express";
import * as controller from "./scholarship.controller.js";
import { protect, authorize } from "../../app/middlewares/auth.middleware.js";

const router = Router();

router.get("/", controller.getScholarships);

router.post("/apply", protect, authorize("student"), controller.applyToScholarship);
router.get("/my-applications", protect, authorize("student"), controller.getMyApplications);

router.post("/", protect, authorize("admin"), controller.addScholarship);
router.get("/admin", protect, authorize("admin"), controller.getAdminScholarships);
router.get("/admin/applications", protect, authorize("admin"), controller.getAdminApplications);
router.patch("/admin/applications/:id/status", protect, authorize("admin"), controller.updateApplicationStatus);
router.delete("/:id", protect, authorize("admin"), controller.deleteScholarship);

export default router;