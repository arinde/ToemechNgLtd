
"use client";
import Image from "next/image";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateProject } from "@/utils/firestore";
import Upload from "./Upload"; // Your reusable image upload component
import { Trash } from "lucide-react";

interface projectType  {
    id: string;
    title: string;
    description: string;
    client: string;
    status: string;
    images?: string[];
}
type EditFormProps = {
    project: projectType; // Use a more specific type if you want
    onClose: () => void;
    onUpdateSuccess: () => void;
};

export default function EditProjectForm({ project, onClose, onUpdateSuccess }: EditFormProps) {
    const [form, setForm] = useState({
        title: project.title || "",
        description: project.description || "",
        client: project.client || "",
        status: project.status || "ongoing",
    });
    const [images, setImages] = useState<string[]>(project.images || []);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (url: string) => {
        setImages((prevImages) => [...prevImages, url]);
        toast.success("New image uploaded!");
    };

    const handleDeleteImage = (indexToDelete: number) => {
        setImages(images.filter((_, index) => index !== indexToDelete));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const updatedData = {
            title: form.title,
            description: form.description,
            client: form.client,
            status: form.status as "ongoing" | "completed",
            images,
        };

        try {
            await updateProject(project.id, updatedData);
            toast.success("Project updated successfully!");
            onUpdateSuccess();
            onClose();
        } catch (error) {
            console.error("Error updating project:", error);
            toast.error("Failed to update project.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
            <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">Edit {project.title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
                    <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" rows={4} />
                    <input type="text" name="client" placeholder="Client Name" value={form.client} onChange={handleChange} className="w-full border p-2 rounded" />
                    <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>

                    {/* Image Management Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
                        <div className="flex flex-wrap gap-2">
                            {images.map((url, index) => (
                                <div key={index} className="relative group">
                                    <Image 
                                    src={url} 
                                    alt={`Project image ${index + 1}`}
                                     width={100} 
                                     height={100}
                                     quality={100}
                                     className="w-24 h-24 object-cover rounded-md border" />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(index)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Remove image"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Add New Images</label>
                        <Upload onUploadSuccess={handleImageUpload} />
                    </div>

                    <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" disabled={loading}>
                        {loading ? "Updating..." : "Update Project"}
                    </button>
                </form>
            </div>
        </div>
    );
}