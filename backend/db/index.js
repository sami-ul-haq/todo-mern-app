import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("DB Connected, DB Host ", connectionInstance.connection.host);
  } catch (error) {
    console.log("MogoDb Connection Instance Failed", error);
  }
};

export default connectDB;
