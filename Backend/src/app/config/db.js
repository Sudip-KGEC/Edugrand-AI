import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "edugrant",
    });

    console.log(" MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);

    // retry after 5s
    setTimeout(connectDB, 5000);
  }
};


// 🔥 DB EVENT LISTENERS (PUT HERE ONLY)
mongoose.connection.on("connected", () => {
  console.log(" MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("🔴 MongoDB error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("🟡 MongoDB disconnected");
});

export default connectDB;