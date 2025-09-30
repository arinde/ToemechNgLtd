"use client";

import { useState, useEffect } from "react";
import Loading from "./loading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { Trash, Edit, X } from "lucide-react";
import { useAuth } from "@/providers/AuthContext";
import {
  getCollectionCount,
  getAllStaff,
  deleteStaff,
  getAllProjects,
  deleteProject,
  getAllClients,
  deleteClient,
} from "@/utils/firestore";
import EditStaffForm from "@/components/EditStaffForm";
import AddProjectForm from "@/components/AddProjectForm";
import EditProjectForm from "@/components/EditProjectForm";
import AddClientForm from "@/components/AddClientForm";
import EditClientForm from "@/components/EditClientForm";
import { auth } from "@/lib/firebase";

export type EmployeeWithId = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  phone: string;
  socials: { twitter?: string; linkedin?: string; email?: string };
};

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
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  const [clients, setClients] = useState<ClientWithId[]>([]);

  // modal states
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeWithId | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectWithId | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientWithId | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<"employees" | "projects" | "clients">("employees");

  // ✅ Greeting + Date/Time
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);
  const hour = dateTime.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const formattedDate = dateTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push("/login");
      else refreshData();
    }
  }, [user, authLoading, router]);

  const refreshData = async () => {
    setDataLoading(true);
    try {
      const [
        staffCount,
        projectCount,
        clientCount,
        staffList,
        projectsList,
        clientsList,
      ] = await Promise.all([
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
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data.");
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleDeleteStaff = async (id: string, name: string) => {
    if (window.confirm(`Delete ${name}?`)) {
      await deleteStaff(id);
      toast.success(`${name} deleted`);
      refreshData();
    }
  };
  const handleEditClick = (e: EmployeeWithId) => {
    setSelectedEmployee(e);
    setIsEditModalOpen(true);
  };
  const handleDeleteProject = async (id: string, title: string) => {
    if (window.confirm(`Delete project: ${title}?`)) {
      await deleteProject(id);
      toast.success("Project deleted");
      refreshData();
    }
  };
  const handleEditProjectClick = (p: ProjectWithId) => {
    setSelectedProject(p);
    setIsEditProjectModalOpen(true);
  };
  const handleDeleteClient = async (id: string, name: string) => {
    if (window.confirm(`Delete client: ${name}?`)) {
      await deleteClient(id);
      toast.success("Client deleted");
      refreshData();
    }
  };
  const handleEditClientClick = (c: ClientWithId) => {
    setSelectedClient(c);
    setIsEditClientModalOpen(true);
  };

  if (authLoading || dataLoading) return <Loading />;

  return (
    <div className="p-8 mt-0">
      {/* ✅ Dynamic Greeting + Date/Time */}
      <h2 className="text-2xl font-semibold">{greeting}, Mr Gabriel</h2>
      <p className="text-gray-600 mt-1">
        {formattedDate} • {formattedTime}
      </p>
      <h1 className="md:text-4xl text-2xl font-bold mt-4">Admin Dashboard</h1>

      {/* summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <SummaryCard
          title="Employees"
          count={employeesCount}
          onAdd={() => router.push("/staffReg")}
        />
        <SummaryCard
          title="Projects"
          count={projectsCount}
          onAdd={() => setIsAddProjectModalOpen(true)}
        />
        <SummaryCard
          title="Clients"
          count={clientsCount}
          onAdd={() => setIsAddClientModalOpen(true)}
        />
      </div>

      {/* tab selector */}
      <div className="flex justify-center gap-8 mt-12 border-b border-gray-200">
        {(["employees", "projects", "clients"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-2 text-lg font-semibold transition-colors duration-300
              ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <span className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-blue-600"></span>
            )}
          </button>
        ))}
      </div>

      {/* tab content */}
      {activeTab === "employees" && (
        <EmployeeList
          employees={employees}
          onEdit={handleEditClick}
          onDelete={handleDeleteStaff}
        />
      )}
      {activeTab === "projects" && (
        <ProjectList
          projects={projects}
          onEdit={handleEditProjectClick}
          onDelete={handleDeleteProject}
        />
      )}
      {activeTab === "clients" && (
        <ClientList
          clients={clients}
          onEdit={handleEditClientClick}
          onDelete={handleDeleteClient}
        />
      )}

      {/* modals */}
      {isEditModalOpen && selectedEmployee && (
        <EditStaffForm
          employee={selectedEmployee}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateSuccess={refreshData}
        />
      )}
      {isEditProjectModalOpen && selectedProject && (
        <EditProjectForm
          project={selectedProject}
          onClose={() => setIsEditProjectModalOpen(false)}
          onUpdateSuccess={refreshData}
        />
      )}
      {isAddProjectModalOpen && (
        <Modal onClose={() => setIsAddProjectModalOpen(false)}>
          <AddProjectForm
            onAddSuccess={refreshData}
            onClose={() => setIsAddProjectModalOpen(false)}
          />
        </Modal>
      )}
      {isAddClientModalOpen && (
        <Modal onClose={() => setIsAddClientModalOpen(false)}>
          <AddClientForm onAddSuccess={refreshData} />
        </Modal>
      )}
      {isEditClientModalOpen && selectedClient && (
        <EditClientForm
          client={selectedClient}
          onClose={() => setIsEditClientModalOpen(false)}
          onUpdateSuccess={refreshData}
        />
      )}
    </div>
  );
}

/* ----------------- small reusable pieces ----------------- */
function SummaryCard({
  title,
  count,
  onAdd,
}: {
  title: string;
  count: number | null;
  onAdd: () => void;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
        <button
          onClick={onAdd}
          className="px-3 py-1 bg-blue-600 text-white rounded-md"
        >
          Add
        </button>
      </div>
      <p className="text-5xl font-extrabold text-blue-600 mt-4">
        {count ?? 0}
      </p>
    </div>
  );
}

/* ✅ Modal with RED close button */
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
      <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl p-6 flex flex-col">
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200 hover:text-red-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[80vh] pr-1">{children}</div>
      </div>
    </div>
  );
}

/* Lists */
function EmployeeList({
  employees,
  onEdit,
  onDelete,
}: {
  employees: EmployeeWithId[];
  onEdit: (e: EmployeeWithId) => void;
  onDelete: (id: string, name: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {employees.map((e) => (
        <div key={e.id} className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
            <Image
              src={e.imageUrl || "/placeholder.jpg"}
              alt={e.name}
              fill
              sizes="96px"
              className="object-cover object-top"
            />
          </div>
          <h3 className="text-xl font-bold">{e.name}</h3>
          <p className="text-blue-600">{e.role}</p>
          <p className="text-sm text-gray-500 mt-2">{e.bio}</p>

          <div className="mt-4 space-y-1 text-sm text-gray-700">
            {e.phone && (
              <p>
                📞{" "}
                <a href={`tel:${e.phone}`} className="hover:underline text-blue-600">
                  {e.phone}
                </a>
              </p>
            )}
            {e.socials.email && (
              <p>
                ✉️{" "}
                <a href={`mailto:${e.socials.email}`} className="hover:underline text-blue-600">
                  {e.socials.email}
                </a>
              </p>
            )}
            {e.socials.linkedin && (
              <p>
                LinkedIn:{" "}
                <a
                  href={e.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  {e.socials.linkedin}
                </a>
              </p>
            )}
            {e.socials.twitter && (
              <p>
                Twitter:{" "}
                <a
                  href={e.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  {e.socials.twitter}
                </a>
              </p>
            )}
          </div>

          <div className="mt-4 flex justify-center space-x-4">
            <IconBtn onClick={() => onEdit(e)} color="yellow" icon={<Edit size={16} />} />
            <IconBtn onClick={() => onDelete(e.id, e.name)} color="red" icon={<Trash size={16} />} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectList({
  projects,
  onEdit,
  onDelete,
}: {
  projects: ProjectWithId[];
  onEdit: (p: ProjectWithId) => void;
  onDelete: (id: string, title: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {projects.map((p) => (
        <div key={p.id} className="bg-white p-6 rounded-lg shadow-md">
          {p.images?.[0] && (
            <div className="relative w-full h-48 mb-4">
              <Image
                src={p.images[0]}
                alt={p.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          <h3 className="text-xl font-bold">{p.title}</h3>
          <p className="text-gray-500 text-sm">Location: {p.location}</p>
          <p className="text-gray-500 text-sm">Company: {p.company}</p>
          <p className="text-gray-500 text-sm line-clamp-3">{p.description}</p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
              p.status === "ongoing"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {p.status}
          </span>
          <div className="mt-4 flex space-x-4">
            <IconBtn onClick={() => onEdit(p)} color="yellow" icon={<Edit size={16} />} />
            <IconBtn onClick={() => onDelete(p.id, p.title)} color="red" icon={<Trash size={16} />} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ClientList({
  clients,
  onEdit,
  onDelete,
}: {
  clients: ClientWithId[];
  onEdit: (c: ClientWithId) => void;
  onDelete: (id: string, name: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {clients.map((c) => (
        <div key={c.id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">{c.companyName}</h3>
          <p className="text-gray-600">Name: {c.name}</p>
          <p className="text-gray-600">Contact: {c.contactPerson}</p>
          <p className="text-gray-600">Phone: {c.phone}</p>
          <p className="text-gray-600">Address: {c.address}</p>
          <p className="text-sm text-gray-500 mt-2">{c.email}</p>
          <div className="mt-4 flex space-x-4">
            <IconBtn onClick={() => onEdit(c)} color="yellow" icon={<Edit size={16} />} />
            <IconBtn onClick={() => onDelete(c.id, c.name)} color="red" icon={<Trash size={16} />} />
          </div>
        </div>
      ))}
    </div>
  );
}

function IconBtn({
  onClick,
  color,
  icon,
}: {
  onClick: () => void;
  color: string;
  icon: React.ReactNode;
}) {
  const colorClass =
    color === "yellow"
      ? "bg-yellow-500 hover:bg-yellow-600"
      : "bg-red-500 hover:bg-red-600";
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full text-white transition-colors ${colorClass}`}
    >
      {icon}
    </button>
  );
}
