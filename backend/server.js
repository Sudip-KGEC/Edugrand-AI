import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";

const startServer = async () => {
  try {
    await connectDB();

    const { default: app } = await import("./src/app.js");


    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
};

startServer();