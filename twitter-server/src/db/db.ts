import mongoose from "mongoose";

async function connectToDB(): Promise<void> {
  const uri: string =
    "mongodb+srv://saksham:saksham123@cluster0.vdtg6ay.mongodb.net/twitterclone";

  try {
    await mongoose.connect(uri);

    console.log("Connected to DB!");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
}

export default connectToDB;
