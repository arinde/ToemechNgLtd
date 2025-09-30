"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";

export type EmployeesData = {
  name: string;
  role: string;
  imageUrl: string;
  phone: string;
  bio: string;
  socials: { twitter?: string; linkedin?: string; email?: string };
};

interface TeamMemberCardProps {
  employee: EmployeesData & { id: string };
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ employee }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col text-center">
      {/* ✅ Image container with fixed ratio */}
      <div className="relative w-full aspect-[4/3]"> 
        <Image
          src={employee.imageUrl}
          alt={employee.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover object-center"
          priority={false}
        />
      </div>

      {/* ✅ Details */}
      <div className="p-6 flex-1 flex flex-col items-center">
        <h3 className="text-lg font-bold text-gray-800">{employee.name}</h3>
        <p className="text-sm text-blue-600 font-semibold">{employee.role}</p>

        {/* Bio with view more/less */}
        <div className="mt-3 text-gray-600 text-sm w-full">
          <p
            className={`transition-all duration-300 ${
              expanded ? "line-clamp-none" : "line-clamp-3"
            }`}
          >
            {employee.bio}
          </p>
          {employee.bio.length > 80 && (
            <button
              onClick={() => setExpanded((p) => !p)}
              className="mt-1 text-blue-600 hover:underline text-sm font-medium"
            >
              {expanded ? "View less" : "Continue reading"}
            </button>
          )}
        </div>

        {/* Social / Contact */}
        <div className="flex mt-4 space-x-4">
          {employee.phone && (
            <Link href={`tel:${employee.phone}`} passHref>
              <span className="cursor-pointer text-gray-600 hover:text-blue-500 transition-colors">
                <Phone className="h-6 w-6" />
              </span>
            </Link>
          )}
          {employee.socials?.email && (
            <Link href={`mailto:${employee.socials.email}`} passHref>
              <span className="cursor-pointer text-gray-600 hover:text-blue-500 transition-colors">
                <Mail className="h-6 w-6" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
