import mongoose from "mongoose";

const connectDB = (url: string) => {
  mongoose.set("strictQuery", true); // search functionnality

  mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

export default connectDB;
