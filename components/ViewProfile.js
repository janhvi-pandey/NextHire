'use client';

export default function ViewProfile({ user }) {
  return (
<div className="mt-18 max-w-2xl mx-auto relative bg-black rounded-xl p-5 shadow-md border border-gray-700 hover:shadow-gray-600 transition-shadow flex flex-col justify-between">
      <div className="space-y-6">
        <p>
          <strong className=" mr-2">Name:</strong> {user.name}
        </p>
        <p>
          <strong className=" mr-2">Location:</strong> {user.location}
        </p>
        <p>
          <strong className=" mr-2">Years of Experience:</strong> {user.experience}
        </p>
        <p>
          <strong className=" mr-2">Skills:</strong> {user.skills.join(', ')}
        </p>
        <p>
          <strong className=" mr-2">Preferred Job Type:</strong> {user.preferredJobType}
        </p>
      </div>
    </div>
  );
}
