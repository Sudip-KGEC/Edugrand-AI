import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Scholarship name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
      index: true,
    },
    provider: {
      type: String,
      required: [true, "Provider is required"],
      trim: true,
      maxlength: 100,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    deadline: {
      type: Date,
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Merit", "Need", "Sports", "Research", "Other"],
      default: "Merit",
      index: true,
    },
    gpaRequirement: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    degreeLevel: {
      type: String,
      required: true,
      enum: ["Undergraduate", "Postgraduate", "PhD", "Diploma", "Other"],
      index: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 2000,
    },
    eligibility: [{ type: String, trim: true }],
    officialUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Enter a valid URL"],
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    totalApplications: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
);

scholarshipSchema.index({ category: 1, degreeLevel: 1 });
scholarshipSchema.index({ adminId: 1, createdAt: -1 });

scholarshipSchema.virtual("isExpired").get(function () {
  return this.deadline < new Date();
});

export default mongoose.model("Scholarship", scholarshipSchema);