import mongoose from 'mongoose';
import Jobs from '@/models/Jobs';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const { searchParams } = new URL(req.url);
    const skillQuery = searchParams.get('skills') || 'N/A';

    let jobs;
    let headline;

    if (skillQuery === 'N/A') {
      jobs = await Jobs.find().sort({ postedAt: -1 }).limit(6);
      headline = 'Complete your skills to get jobs based on your profile';
    } else {
      const skills = skillQuery
        .split(',')
        .map(skill => new RegExp(`.*${skill.trim()}.*`, 'i')); 

      jobs = await Jobs.find({ skills: { $in: skills } }).sort({ postedAt: -1 });

      headline = jobs.length
        ? 'Jobs based on your skills'
        : 'No matching jobs found. Consider updating your skills.';
    }

    return NextResponse.json({ jobs, headline });
  } catch (err) {
    // console.error('Error fetching jobs:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
}
