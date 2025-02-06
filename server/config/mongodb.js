import mongoose from "mongoose";

const connectDb = async () => {
  mongoose.connection.on("connected", () =>
    console.log("DB CONNECTION SUCCESSFUL")
  );
  await mongoose.connect(`${process.env.MONGODB_URI}/ai-symptom-checker`);
};

export default connectDb;
