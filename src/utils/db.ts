import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect( "mongodb+srv://Thomson:mongodb@taskmanager.or8tbtc.mongodb.net" as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);
    
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
};

export default connectDB;
