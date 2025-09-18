// components/AddProjectForm.tsx

"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { addProject } from "@/utils/firestore";
import Upload from "./Upload";
import Image from "next/image";

type AddProjectFormProps = {
  onAddSuccess: () => void;
  // New prop to handle closing the modal
  onClose: () => void; 
};

export default function AddProjectForm({ onAddSuccess, onClose }: AddProjectFormProps) {
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
        company: form.company,
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
      onAddSuccess();
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-64 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="max-w-6xl w-full bg-white p-6 md:p-10 rounded-xl shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-2">Add New Project</h2>
        <p className="text-center text-gray-500 mb-8">
          Fill out the details below to add a new project to your portfolio.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="e.g., The Grand Office Complex"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="company" className="text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="e.g., CityScape Holdings"
                value={form.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Provide a detailed description of the project..."
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="location" className="text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g., New York, NY"
                value={form.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Images</label>
            <Upload onUploadSuccess={handleImageUpload} />
            
            <div className="flex flex-wrap gap-3 mt-4">
              {images.length > 0 ? (
                images.map((url, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                    <Image 
                      src={url} 
                      alt={`Project image ${index + 1}`} 
                      layout="fill" 
                      objectFit="cover" 
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic">
                  No images uploaded yet. Upload at least one.
                </p>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : (
              "Add Project"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}