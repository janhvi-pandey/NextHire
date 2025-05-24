import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  await connectDB();

  try {
    const token = req.headers.get("token");

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
 
    const user = await User.findById(decodedToken.id).select("-password"); 

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    // console.error(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
