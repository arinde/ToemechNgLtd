"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateProject } from "@/utils/firestore";
import Upload from "./Upload"; // Your reusable image upload component
import { Trash, X } from "lucide-react";

interface ProjectType {
  id: string;
  title: string;
  description: string;
  client: string;
  status: string;
  location: string;
  images?: string[];
}

type EditFormProps = {
  project: ProjectType;
  onClose: () => void;
  onUpdateSuccess: () => void;
};

export default function EditProjectForm({
  project,
  onClose,
  onUpdateSuccess,
}: EditFormProps) {
  const [form, setForm] = useState({
    title: project.title || "",
    description: project.description || "",
    client: project.client || "",
    location: project.location || "",
    status: project.status || "ongoing",
  });
  const [images, setImages] = useState<string[]>(project.images || []);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url: string) => {
    setImages((prev) => [...prev, url]);
    toast.success("New image uploaded!");
  };

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = {
      title: form.title,
      description: form.description,
      location: form.location,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
      {/* Modal container */}
      <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl p-6 flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-50 flex items-center justify-center rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200 hover:text-red-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[80vh] pr-1">
          <h2 className="text-2xl font-bold mb-6">Edit {project.title}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border p-3 rounded resize-none"
              required
            />
            <input
              type="text"
              name="client"
              placeholder="Client Name"
              value={form.client}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>

            {/* Current images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Images
              </label>
              <div className="flex flex-wrap gap-2">
                {images.map((url, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={url}
                      alt={`Project image ${index + 1}`}
                      width={100}
                      height={100}
                      quality={100}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
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

            {/* Add new images */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Add New Images
              </label>
              <Upload onUploadSuccess={handleImageUpload} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white font-medium shadow-md hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70 transition"
            >
              {loading ? "Updating..." : "Update Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
