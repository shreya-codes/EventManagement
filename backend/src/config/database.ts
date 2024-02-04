import mongoose, { ConnectOptions } from "mongoose";
const connectToDatabase = async () => {
  const database = process.env.MONGODB_URI;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  if (!database) {
    console.error(
      "MONGODB_URI environment variable is not defined.",
      options as ConnectOptions
    );
    process.exit(1); // Exit the process or handle the error appropriately
  }

  try {
    await mongoose.connect(database, options as ConnectOptions);
    console.log("Connected to database!\n");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export default connectToDatabase;
