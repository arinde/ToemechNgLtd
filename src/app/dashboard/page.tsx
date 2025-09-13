"use client";
import Loading from "./loading";
import { useAuth } from "@/providers/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  getCollectionCount,
  getAllStaff,
  deleteStaff,
  getAllProjects,
  deleteProject,
  getAllClients,
  deleteClient,
} from "@/utils/firestore";
import { Trash, Edit } from "lucide-react";
import { toast } from "react-hot-toast";
import EditStaffForm from "@/components/EditStaffForm";
import AddProjectForm from "@/components/AddProjectForm";
import EditProjectForm from "@/components/EditProjectForm";
import AddClientForm from "@/components/AddClientForm";
import EditClientForm from "@/components/EditClientForm";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export type EmployeeWithId = {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
    bio: string;
    socials: { twitter?: string; linkedin?: string; email?: string };

}

type ClientWithId = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
};

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

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [employeesCount, setEmployeesCount] = useState<number | null>(null);
  const [projectsCount, setProjectsCount] = useState<number | null>(null);
  const [clientsCount, setClientsCount] = useState<number | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const [employees, setEmployees] = useState<EmployeeWithId[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeWithId | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectWithId | null>(null);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [clients, setClients] = useState<ClientWithId[]>([]);
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientWithId | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login");
      } else {
        refreshData();
      }
    }
  }, [user, authLoading, router]);

  const refreshData = async () => {
    setDataLoading(true);
    try {
      const [staffCount, projectCount, clientCount, staffList, projectsList, clientsList] = await Promise.all([
        getCollectionCount("employees"),
        getCollectionCount("projects"),
        getCollectionCount("clients"),
        getAllStaff(),
        getAllProjects(),
        getAllClients(),
      ]);

      setEmployeesCount(staffCount);
      setProjectsCount(projectCount);
      setClientsCount(clientCount);
      setEmployees(staffList as EmployeeWithId[]);
      setProjects(projectsList as ProjectWithId[]);
      setClients(clientsList as ClientWithId[]);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Failed to load dashboard data.");
    } finally {
      setDataLoading(false);
    }
  };

  if (authLoading || dataLoading) {
    return <Loading />;
  }

  const handleDeleteStaff = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteStaff(id);
        toast.success(`${name} deleted successfully!`);
        refreshData();
      } catch (error) {
        console.error("Error deleting staff:", error);
        toast.error("Failed to delete staff.");
      }
    }
  };

  const handleEditClick = (employee: EmployeeWithId) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleUpdateSuccess = () => {
    refreshData();
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the project: ${title}?`)) {
      try {
        await deleteProject(id);
        toast.success("Project deleted successfully!");
        refreshData();
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project.");
      }
    }
  };

  const handleEditProjectClick = (project: ProjectWithId) => {
    setSelectedProject(project);
    setIsEditProjectModalOpen(true);
  };

  const handleUpdateProjectSuccess = () => {
    refreshData();
    handleCloseEditProjectModal();
  };

  const handleCloseEditProjectModal = () => {
    setIsEditProjectModalOpen(false);
    setSelectedProject(null);
  };

  const handleAddClientClick = () => {
    setIsAddClientModalOpen(true);
  };

  const handleCloseAddClientModal = () => {
    setIsAddClientModalOpen(false);
  };
  
  const handleAddClientSuccess = () => {
    refreshData();
    handleCloseAddClientModal();
  };

  const handleEditClientClick = (client: ClientWithId) => {
    setSelectedClient(client);
    setIsEditClientModalOpen(true);
  };

  const handleUpdateClientSuccess = () => {
    refreshData();
    handleCloseEditClientModal();
  };

  const handleCloseEditClientModal = () => {
    setIsEditClientModalOpen(false);
    setSelectedClient(null);
  };

  const handleDeleteClient = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the client: ${name}?`)) {
      try {
        await deleteClient(id);
        toast.success("Client deleted successfully!");
        refreshData();
      } catch (error) {
        console.error("Error deleting client:", error);
        toast.error("Failed to delete client.");
      }
    }
  };

  const handleAddProjectClick = () => {
    setIsAddProjectModalOpen(true);
  };

  const handleCloseAddProjectModal = () => {
    setIsAddProjectModalOpen(false);
  };
  
  const handleAddProjectSuccess = () => {
    refreshData();
    handleCloseAddProjectModal();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="p-8 mt-16">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Employees Card with Add Button */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-700">Employees</h2>
            <button onClick={handleLogout}> Signout</button>
            <Link href="/staffReg">
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
                Add
              </button>
            </Link>
          </div>
          <p className="text-5xl font-extrabold text-blue-600 mt-4">
            {employeesCount}
          </p>
        </div>

        {/* Projects Card with Add Button */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-700">Projects</h2>
            <button 
                onClick={handleAddProjectClick} 
                className="px-3 py-1 bg-blue-600 text-white rounded-md">
              Add
            </button>
          </div>
          <p className="text-5xl font-extrabold text-blue-600 mt-4">
            {projectsCount}
          </p>
        </div>

        {/* Clients Card with Add Button */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-700">Clients</h2>
            <button onClick={handleAddClientClick} className="px-3 py-1 bg-blue-600 text-white rounded-md">
              Add
            </button>
          </div>
          <p className="text-5xl font-extrabold text-blue-600 mt-4">
            {clientsCount}
          </p>
        </div>
      </div>

        <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Staff List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
                <div
                key={employee.id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                >
                <Image
                    src={employee.imageUrl || "/path/to/placeholder-image.jpg"}
                    alt={employee.name}
                    className=" h-24 rounded-full object-cover mb-4"
                    width={104}
                    quality={100}
                    height={100}
                />
                <h3 className="text-xl font-bold">{employee.name}</h3>
                <p className="text-blue-600">{employee.role}</p>
                <p className="text-sm text-gray-500 mt-2">{employee.bio}</p>
                <div className="mt-4 flex space-x-4">
                    <button
                    onClick={() => handleEditClick(employee)}
                    className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                    >
                    <Edit size={16} />
                    </button>
                    <button
                    onClick={() => handleDeleteStaff(employee.id, employee.name)}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                    <Trash size={16} />
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>

        <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Projects List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
                    {project.images && project.images.length > 0 && (
                        <div className="relative w-full h-48">
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
                <h3 className="text-xl font-bold">Title: {project.title}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">Location: {project.location}</p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">Company: {project.company}</p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    Project Description: {project.description}
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
                <div className="mt-4 flex space-x-4">
                    <button
                    onClick={() => handleEditProjectClick(project)}
                    className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                    >
                    <Edit size={16} />
                    </button>
                    <button
                    onClick={() => handleDeleteProject(project.id, project.title)}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                    <Trash size={16} />
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>

        <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Clients List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{client.companyName}</h3>
              <p className="text-gray-600">Name: {client.name}</p>
              <p className="text-gray-600">Contact: {client.contactPerson}</p>
              <p className="text-gray-600">Phone: {client.phone}</p>
              <p className="text-gray-600">Address: {client.address}</p>
              <p className="text-sm text-gray-500 mt-2">{client.email}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleEditClientClick(client)}
                  className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteClient(client.id, client.name)}
                  className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditModalOpen && selectedEmployee && (
        <EditStaffForm
          employee={selectedEmployee}
          onClose={handleCloseModal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {isEditProjectModalOpen && selectedProject && (
        <EditProjectForm
          project={selectedProject}
          onClose={handleCloseEditProjectModal}
          onUpdateSuccess={handleUpdateProjectSuccess}
        />
      )}

      {isAddProjectModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
            <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={handleCloseAddProjectModal}
            >
                &times;
            </button>
            <AddProjectForm onAddSuccess={handleAddProjectSuccess} />
          </div>
        </div>
      )}

      {isAddClientModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
            <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={handleCloseAddClientModal}
            >
                &times;
            </button>
            <AddClientForm onAddSuccess={handleAddClientSuccess} />
          </div>
        </div>
      )}

      {isEditClientModalOpen && selectedClient && (
        <EditClientForm
          client={selectedClient}
          onClose={handleCloseEditClientModal}
          onUpdateSuccess={handleUpdateClientSuccess}
        />
      )}
    </div>
  );
}