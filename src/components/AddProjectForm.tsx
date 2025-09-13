// components/AddProjectForm.tsx

"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { addProject } from "@/utils/firestore";
import Upload from "./Upload"; // Assuming this is your reusable upload component
import Image from "next/image";

type AddProjectFormProps = {
  onAddSuccess: () => void;
};

export default function AddProjectForm({ onAddSuccess }: AddProjectFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    status: "ongoing",
    company: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url: string) => {
    setImages((prevImages) => [...prevImages, url]);
    toast.success("Image uploaded!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      setLoading(false);
      return;
    }

    try {
      await addProject({
        title: form.title,
        description: form.description,
        location: form.location,
        status: form.status as "ongoing" | "completed",
        images,
        company: form.company
      });

      toast.success("Project added successfully!");
      // Reset form and images state after successful submission
      setForm({
        title: "",
        description: "",
        location: "",
        status: "ongoing",
        company: "",
      });
      setImages([]);
      setLoading(false);
      onAddSuccess(); // Notify parent component to refresh data
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Add New Project</h2>
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={4}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="company"
        placeholder="Client Name"
        value={form.company}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      
      {/* Upload multiple images */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Project Images</label>
        <Upload onUploadSuccess={handleImageUpload} />
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((url, index) => (
            <Image key={index} src={url} alt={`Project image ${index + 1}`} className="w-20 h-20 object-cover rounded-md border" />
          ))}
        </div>
      </div>
      
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}