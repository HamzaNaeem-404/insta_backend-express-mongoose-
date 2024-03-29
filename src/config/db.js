import mongoose from "mongoose";
const connectDB = async () => {
  const uri = process.env.mongoose;
  mongoose
    .connect(uri, {
      autoCreate: true,
      autoIndex: true,
    })
    .then((res) => {
      console.log("Connected db connection");
    })
    .catch((err) => {
      console.log("Error connecting db connection", err);
    });
};

export default connectDB;
