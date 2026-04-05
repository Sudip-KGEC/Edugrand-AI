import cron from "node-cron";
import Scholarship from "../database/models/Scholarship.model.js";
import Notification from "../database/models/Notification.model.js";
import User from "../database/models/User.model.js";

import { sendEmail } from "../services/email/email.service.js";
import { deadlineTemplate } from "../services/email/email.templates.js";

export const startDeadlineJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 2);

      const start = new Date(targetDate.setHours(0, 0, 0, 0));
      const end = new Date(targetDate.setHours(23, 59, 59, 999));

      const scholarships = await Scholarship.find({
        deadline: { $gte: start, $lte: end },
        isActive: true,
      });

      const notifications = [];

      for (const scholarship of scholarships) {

        // Filter eligible students
        const students = await User.find({
          role: "student",
          cgpa: { $gte: scholarship.gpaRequirement },

          $or: [
            { currentDegree: scholarship.degreeLevel },
            { highestDegree: scholarship.degreeLevel }
          ]
        }).select("_id email name cgpa currentDegree highestDegree");

        for (const student of students) {
          notifications.push({
            recipientId: student._id,
            title: "Deadline Approaching!",
            message: `Scholarship "${scholarship.name}" expires in 2 days`,
            type: "DEADLINE",
          });

          // send email only to eligible student
          await sendEmail({
            to: student.email,
            subject: "Deadline Reminder",
            html: deadlineTemplate(scholarship.name),
          });
        }
      }

      if (notifications.length) {
        await Notification.insertMany(notifications);
      }

    } catch (err) {
      console.error("Deadline Job Error:", err);
    }
  });
};