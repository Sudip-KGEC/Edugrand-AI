import dotenv from "dotenv";
dotenv.config();

import app from "./src/app/app.js";
import connectDB from "./src/app/config/db.js";
import { startJobs } from "./src/jobs/index.js";



const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start", error);
    process.exit(1);
  }
};

startServer();
startJobs();