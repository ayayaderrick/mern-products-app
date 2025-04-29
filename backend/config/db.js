import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
