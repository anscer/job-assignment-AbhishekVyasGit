import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/db";

const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port: ${port}`);
    });
  } catch (err) {
    console.error("MONGODB connection failed !!!", err);
    process.exit(1); // Exit the process with failure
  }
};
startServer();

import app from "./app";