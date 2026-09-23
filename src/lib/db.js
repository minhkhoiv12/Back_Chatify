import dns from "dns";
import mongoose from "mongoose";
import { ENV } from "./env.js";

// MongoDB Atlas URI with mongodb+srv:// requires Node.js to resolve SRV records.
// Some local/ISP DNS servers can reject Node's SRV lookup with ECONNREFUSED,
// so use public DNS servers as a fallback for the Node process.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) throw new Error("Chưa cấu hình biến môi trường MONGO_URI");

    const conn = await mongoose.connect(MONGO_URI);
    console.log("KẾT NỐI MONGODB THÀNH CÔNG:", conn.connection.host);
  } catch (error) {
    console.error("LỖI KẾT NỐI ĐẾN MONGODB:", error);
    process.exit(1); // 1 status code means fail, 0 means success
  }
};