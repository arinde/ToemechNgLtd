"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { addStaff } from "@/utils/firestore";
import Upload from "./Upload";

export default function StaffPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    role: "",
    imageUrl: "",
    bio: "",
    twitter: "",
    linkedin: "",
    email: "",
    phone: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error("Please upload an image");
      return;
    }
    setLoading(true);
    try {
      await addStaff({
        name: form.name,
        role: form.role,
        bio: form.bio,
        phone: form.phone,
        socials: {
          twitter: form.twitter,
          linkedin: form.linkedin,
          email: form.email,
        },
        imageUrl,
      });
      toast.success("Staff registered successfully");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Error adding staff details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Add New Staff Member
      </h1>
      <p className="text-gray-600 mb-8">
        Fill out the form below to create a new staff profile.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role / Title"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Bio */}
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Short Biography"
          rows={4}
          required
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />

        {/* Social & Contact */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Social & Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              name="twitter"
              value={form.twitter}
              onChange={handleChange}
              placeholder="Twitter URL"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone No"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Profile Photo
          </h2>
          <Upload onUploadSuccess={(url) => setImageUrl(url)} />
          {imageUrl && (
            <p className="mt-2 text-sm text-green-600">
              Image uploaded successfully ✅
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save Staff"}
        </button>
      </form>
    </main>
  );
}
