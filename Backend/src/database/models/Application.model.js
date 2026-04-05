import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    scholarshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["Applied", "Under Review", "Accepted", "Rejected"],
      default: "Applied",
      index: true,
    },

    appliedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    // 🔥 FUTURE READY (IMPORTANT)
    notes: {
      type: String,
      maxlength: 500,
    },

    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



applicationSchema.index({ studentId: 1, createdAt: -1 });
applicationSchema.index({ adminId: 1, status: 1 });
applicationSchema.index({ scholarshipId: 1, studentId: 1 }, { unique: true });






applicationSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return obj;
};



export default mongoose.model("Application", applicationSchema);