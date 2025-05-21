'use client';

import React from 'react';
import { BsBookmark } from 'react-icons/bs';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Solutions',
    location: 'New York',
    skills: ['React', 'Tailwind CSS', 'JavaScript'],
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'Cloudware',
    location: 'San Francisco',
    skills: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'Remote',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
  },
  {
    id: 4,
    title: 'Fullstack Developer',
    company: 'InnovateX',
    location: 'Austin',
    skills: ['React', 'Node.js', 'GraphQL'],
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'DataCorp',
    location: 'Boston',
    skills: ['Python', 'Machine Learning', 'SQL'],
  },
];

export default function JobList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map(({ id, title, company, location, skills }) => (
        <div
          key={id}
          className="relative bg-black rounded-xl p-5 shadow-md border border-gray-700 hover:shadow-gray-600 transition-shadow flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
            <p className="text-gray-400 mb-1 font-medium">{company}</p>
            <p className="text-gray-500 mb-3">{location}</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="border text-gray-300 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <BsBookmark className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 cursor-pointer" size={20} />
        </div>
      ))}
    </div>
  );
}
