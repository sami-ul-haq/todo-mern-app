import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection Error ", err);
  });
