import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Mail, Phone } from 'lucide-react'; // Added Phone icon

// Declare the type directly in this file
export type EmployeesData = {
  name: string;
  role: string;
  imageUrl: string;
  phone: string;
  bio: string;
  socials: { twitter?: string; linkedin?: string; email?: string;};
}

interface TeamMemberCardProps {
  employee: EmployeesData & { id: string };
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ employee }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center text-center">
      {/* Employee Image - Now rectangular and covers width */}
      <div className="relative w-full h-48 mb-4"> {/* Adjusted for rectangular image */}
        <Image 
          src={employee.imageUrl}
          alt={employee.name}
          layout="fill" // Makes the image fill its parent container
          objectFit="cover" // Ensures the image covers the area without distortion
          className="rounded-t-lg" // Rounds only the top corners if desired, or remove for sharp corners
        />
      </div>
      
      {/* Employee Details */}
      <div className="p-6 pt-0"> {/* Adjusted padding if image takes top space */}
        <h3 className="text-lg font-bold text-gray-800">{employee.name}</h3>
        <p className="text-sm text-blue-600 font-semibold">{employee.role}</p>

        {/* Social Icons */}
        <div className="flex mt-3 space-x-4 items-center justify-center">
          {employee.phone && (
            <Link href={`tel:${employee.phone}`} passHref>
              <span className="text-gray-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer">
                <Phone className="h-6 w-6" /> {/* Lucide Phone icon */}
              </span>
            </Link>
          )}
          {employee.socials?.email && (
            <Link href={`mailto:${employee.socials.email}`} passHref>
              <span className="text-gray-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer">
                <Mail className="h-6 w-6" /> {/* Lucide Mail icon */}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;