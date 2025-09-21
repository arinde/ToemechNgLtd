import React from 'react';
import TeamMemberCard from '@/components/TeamMemberCard';
import { getAllStaff } from '@/utils/firestore'; // Correctly import the function from your firebase lib

// Declare the EmployeesData type in this file
export type EmployeesData = {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  phone: string;
  socials: { twitter?: string; linkedin?: string; email?: string;};
}

interface EmployeeWithId extends EmployeesData {
  id: string;
}

const FullTeamPage = async () => {
  const staffData = await getAllStaff();
  const employees: EmployeeWithId[] = staffData as EmployeeWithId[];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Our Full Team</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet all the incredible individuals who make our work possible.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {employees.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No team members found.</p>
        ) : (
          employees.map((employee) => (
            <TeamMemberCard key={employee.id} employee={employee} />
          ))
        )}
      </div>
    </div>
  );
};

export default FullTeamPage;