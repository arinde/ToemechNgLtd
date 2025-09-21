import { 
    addDoc, 
    deleteDoc, 
    collection, 
    doc, 
    getCountFromServer,
    getDocs,
    updateDoc
} from "firebase/firestore";
import { db }  from "@/lib/firebase";
import { toast } from "react-hot-toast";

export type ProjectData = {
    title: string;
    company: string;
    description: string;
    images: string[]; 
    location: string;
    status: "ongoing" | "completed";
};

export type EmployeesData = {
    name: string;
    role: string;
    imageUrl: string;
    bio: string;
    socials: { twitter?: string; linkedin?: string; email?: string };
}

export type ClientData = {
    name: string;
    contactPerson: string;
    email: string;
    phone?: string;
    companyName: string;
    address?: string;
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

export async function addStaff(employees: EmployeesData) {
    const docRef = await addDoc(collection(db, "employees"), employees)
    return docRef.id
}

export async function deleteStaff(id: string) {
    await deleteDoc(doc(db, "employees", id))
}

export async function getCollectionCount(collectionName: string) {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  } catch (error) {
    console.error(`Error counting documents in ${collectionName}:`, error);
    toast.error("Error fetching data counts");
    return 0; 
  }
}

export async function getAllStaff() {
    const staffCollectionRef = collection(db, "employees");
    const staffSnapshot = await getDocs(staffCollectionRef);
    const staffList = staffSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return staffList;
}

export async function updateStaff(id: string, updatedData: Partial<EmployeesData>) {
    const staffDocRef = doc(db, "employees", id);
    await updateDoc(staffDocRef, updatedData);
}

export async function addProject(project: ProjectData) {
  const docRef = await addDoc(collection(db, "projects"), project);
  return docRef.id;
}

// New function to fetch all projects
export async function getAllProjects(): Promise<ProjectWithId[]> {
  const projectsCollectionRef = collection(db, "projects");
  const projectsSnapshot = await getDocs(projectsCollectionRef);
  const projectsList = projectsSnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<ProjectWithId, "id">;
    return {
      id: doc.id,
      ...data,
    };
  });
  return projectsList;
}

// New function to delete a project
export async function deleteProject(id: string) {
    await deleteDoc(doc(db, "projects", id));
}

// New function to update a project
export async function updateProject(id: string, updatedData: Partial<ProjectData>) {
    const projectDocRef = doc(db, "projects", id);
    await updateDoc(projectDocRef, updatedData);
}

export async function addClient(client: ClientData) {
  const docRef = await addDoc(collection(db, "clients"), client);
  return docRef.id;
}

export async function getAllClients() {
  const clientsCollectionRef = collection(db, "clients");
  const clientsSnapshot = await getDocs(clientsCollectionRef);
  const clientsList = clientsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return clientsList;
}

// New function to delete a client
export async function deleteClient(id: string) {
    await deleteDoc(doc(db, "clients", id));
}

// New function to update a client
export async function updateClient(id: string, updatedData: Partial<ClientData>) {
    const clientDocRef = doc(db, "clients", id);
    await updateDoc(clientDocRef, updatedData);
}