"use client";

import React, { useEffect, useState } from 'react';
import TeamMemberCard from './TeamMemberCard';
import Link from 'next/link';
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Declare the EmployeesData type in this file
export type EmployeesData = {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  phone: string;
  socials: { twitter?: string; linkedin?: string; email?: string; phone?: string };
}

// Function to fetch all staff
export async function getAllStaff() {
    const staffCollectionRef = collection(db, "employees");
    const staffSnapshot = await getDocs(staffCollectionRef);
    const staffList = staffSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return staffList;
}

interface EmployeeWithId extends EmployeesData {
  id: string;
}

const TeamSection: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const staffData = await getAllStaff();
        setEmployees(staffData as EmployeeWithId[]);
      } catch (err) {
        console.error("Failed to fetch staff data:", err);
        setError("Failed to load team members.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading team members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const displayedEmployees = employees.slice(0, 4);

  return (
    <section id='team' className='bg-gray-50'>
    <div className="container mx-auto px-4 py-12 ">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold font-serif text-blue-600 mb-2">Meet The Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet the professionals powering our projects forward.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedEmployees.map((employee) => (
          <TeamMemberCard key={employee.id} employee={employee} />
        ))}
      </div>

      {employees.length > 4 && (
        <div className="text-center mt-12">
          <Link href="/team" passHref>
            <span className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              View All Team Members
            </span>
          </Link>
        </div>
      )}
    </div>
    </section>
  );
};

export default TeamSection;