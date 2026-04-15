import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
      index: true,
    },
    college: { type: String, trim: true },
    cgpa: { type: Number, min: 0, max: 10 },
    class12Marks: { type: Number, min: 0, max: 100 },
    highestDegree: { type: String, trim: true },
    currentDegree: { type: String, trim: true },
    fieldOfStudy: { type: String, default: "General", trim: true },
    organization: { type: String, trim: true },
    department: { type: String, trim: true },
    designation: { type: String, trim: true },
    employeeId: { type: String, trim: true },
    appliedScholarships: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" },
    ],
    verified: { type: Boolean, default: false },
    lastLoginAt: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export default mongoose.model("User", userSchema);