"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import { updateStaff } from "@/utils/firestore";

interface staffType {
  name: string;
  role: string;
  bio: string;
  phone: string;
  image?: string; // ✅ add image
  socials: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
  id: string;
}

type EditFormProps = {
  employee: staffType;
  onClose: () => void;
  onUpdateSuccess: () => void;
};

export default function EditStaffForm({
  employee,
  onClose,
  onUpdateSuccess,
}: EditFormProps) {
  const [form, setForm] = useState({
    name: employee.name || "",
    role: employee.role || "",
    bio: employee.bio || "",
    phone: employee.phone || "",
    twitter: employee.socials?.twitter || "",
    linkedin: employee.socials?.linkedin || "",
    email: employee.socials?.email || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null); // ✅
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!); // ✅
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD!}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    if (!res.ok) throw new Error("Image upload failed");
    return data.secure_url as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = employee.image || "";

      // ✅ Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const updatedData = {
        name: form.name,
        role: form.role,
        bio: form.bio,
        phone: form.phone,
        image: imageUrl, // ✅ save new image
        socials: {
          twitter: form.twitter,
          linkedin: form.linkedin,
          email: form.email,
        },
      };

      await updateStaff(employee.id, updatedData);
      toast.success("Staff updated successfully!");
      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error("Failed to update staff.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
    <div className="relative w-full max-w-md bg-white p-8 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 p-1 rounded-full"
      >
        <X className="text-red-600" />
      </button>
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone No"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="twitter"
            placeholder="Twitter"
            value={form.twitter}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn"
            value={form.linkedin}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* ✅ Image Upload */}
          <div>
            <label className="block mb-1 text-gray-600">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />
            {employee.image && (
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : employee.image}
                alt="Preview"
                className="mt-2 h-24 w-24 object-cover rounded-md border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Staff"}
          </button>
        </form>
      </div>
    </div>
  );
}
