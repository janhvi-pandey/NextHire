'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function EditProfile({ user }) {
  const [form, setForm] = useState({
    name: user.name || '',
    location: user.location || '',
    experience: user.experience || '',
    skills: user.skills || [],
    preferredJobType: user.preferredJobType || 'Any',
  });

  const skillOptions = [
    'React',
    'Node.js',
    'Tailwind CSS',
    'GraphQL',
    'Python',
    'Machine Learning',
    'Figma',
    'SQL',
  ];

  const jobTypes = ['Remote', 'Onsite', 'Any'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'skills') {
      if (checked) {
        setForm((prev) => ({
          ...prev,
          skills: [...prev.skills, value],
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          skills: prev.skills.filter((skill) => skill !== value),
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    alert('Profile updated successfully!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 text-gray-300 space-y-6"
    >

      <div>
        <Label htmlFor="name" className="block mb-2 text-yellow-400 font-medium">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="bg-gray-800 text-white placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400 rounded-md px-4 py-2 w-full"
        />
      </div>

      <div>
        <Label htmlFor="location" className="block mb-2 text-yellow-400 font-medium">
          Location
        </Label>
        <Input
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="bg-gray-800 text-white placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400 rounded-md px-4 py-2 w-full"
        />
      </div>

      <div>
        <Label htmlFor="experience" className="block mb-2 text-yellow-400 font-medium">
          Years of Experience
        </Label>
        <Input
          id="experience"
          name="experience"
          type="number"
          min="0"
          value={form.experience}
          onChange={handleChange}
          className="bg-gray-800 text-white placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400 rounded-md px-4 py-2 w-full"
        />
      </div>

      <div>
        <Label className="block mb-2 text-yellow-400 font-medium">Skills</Label>
        <div className="flex flex-wrap gap-3 text-gray-300">
          {skillOptions.map((skill) => (
            <label key={skill} className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="skills"
                value={skill}
                checked={form.skills.includes(skill)}
                onChange={handleChange}
                className="accent-yellow-400"
              />
              <span>{skill}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label className="block mb-2 text-yellow-400 font-medium">Preferred Job Type</Label>
        <select
          name="preferredJobType"
          value={form.preferredJobType}
          onChange={handleChange}
          className="bg-gray-800 text-white placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400 rounded-md px-4 py-2 w-full"
        >
          {jobTypes.map((type) => (
            <option key={type} value={type} className="bg-gray-800 text-white">
              {type}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-gray-900 font-semibold rounded-md py-3 shadow-md transition-transform hover:scale-105"
      >
        Save Changes
      </Button>
    </form>
  );
}
