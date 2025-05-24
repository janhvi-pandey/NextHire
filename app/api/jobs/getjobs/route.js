import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/verifyToken'; 
import Job from '@/models/Jobs';
import User from '@/models/User';
import dbConnect from '@/lib/db'; 
import dotenv from 'dotenv';

dotenv.config();

// Function to calculate score based on user-job match
function getJobScore(job, user) {
  let score = 0;

  const jobSkills = Array.isArray(job.skills) ? job.skills : [];
  const userSkills = Array.isArray(user.skills) ? user.skills : [];

  const matchingSkills = jobSkills.filter((skill) =>
    userSkills.includes(skill)
  );
  score += matchingSkills.length * 10;

  if (
    job.location &&
    user.location &&
    job.location.toLowerCase() === user.location.toLowerCase()
  ) {
    score += 5;
  }

  if (
    job.jobType &&
    user.jobType &&
    job.jobType.toLowerCase() === user.jobType.toLowerCase()
  ) {
    score += 5;
  }

  if (
    typeof job.experienceInYears === 'number' &&
    typeof user.experienceInYears === 'number'
  ) {
    const expDiff = Math.abs(job.experienceInYears - user.experienceInYears);
    score += Math.max(0, 10 - expDiff * 2);
  }

  return score;
}

// GET route handler
export async function GET(req) {
  try {
    await dbConnect();

    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const jobs = await Job.find();

    const jobScores = jobs.map((job) => ({
      job,
      score: getJobScore(job, user),
    }));

    const topJobs = jobScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ job, score }) => ({
        ...job.toObject(),
        score,
      }));

    return NextResponse.json({ jobs: topJobs }, { status: 200 });
  } catch (error) {
    // console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
