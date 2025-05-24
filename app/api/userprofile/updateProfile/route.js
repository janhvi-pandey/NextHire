import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import jwt from 'jsonwebtoken';
import User from '@/models/User';

export async function PUT(request) {
  try {
    console.log("Connecting to DB...");
    await connectDB();

    const token = request.headers.get('token');
    // console.log("Received token:", token);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - No token' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded token:", decoded);
    } catch (err) {
      // console.error("JWT Verify failed:", err);
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
    }

    const userId = decoded.id;
    // console.log("User ID from token:", userId);

    const body = await request.json();
    // console.log("Request body:", body);

    const { name, location, yearsOfExperience, skills, jobType } = body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        location,
        yearsOfExperience,
        skills,
        jobType,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });

  } catch (error) {
    // console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
