"use client";
import { getAllProjects } from "@/utils/firestore";
import { useState, useEffect } from "react";
import Image from "next/image";

type ProjectWithId = {
  id: string;
  title: string;
  company: string;
  description: string;
  images: string[];
  location: string;
  client: string;
  status: "ongoing" | "completed";
};

export default function Project() {
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const projectList = await getAllProjects();

      const fullProjects: ProjectWithId[] = projectList.map((project) => ({
        id: project.id,
        title: project.title ?? "",
        company: project.company ?? "",
        description: project.description ?? "",
        images: project.images ?? [],
        location: project.location ?? "",
        client: project.client ?? "",
        status: project.status ?? "ongoing",
      }));

      setProjects(fullProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="py-12 px-4">
      <div>
        <h2 className="text-4xl font-bold text-center font-serif text-grey-800">Projects</h2>
        <p className="text-center text-gray-600 mt-2">
          A showcase of our expertise across diverse industries
        </p>

        {loading ? (
          <p className="text-center mt-8 text-gray-500">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center mt-8 text-gray-500">No projects found.</p>
        ) : (
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  {project.images?.length > 0 && (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        quality={100}
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm font-sans text-gray-700 font-semibold">
                    {project.company}
                  </p>
                  <p className="text-sm text-gray-600">
                    {project.location}
                  </p>
                  
                  <p className="text-sm text-grey-700 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === "ongoing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
