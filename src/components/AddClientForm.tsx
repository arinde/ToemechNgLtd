"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { addClient } from "@/utils/firestore";

type AddClientFormProps = {
  onAddSuccess: () => void;
};

export default function AddClientForm({ onAddSuccess }: AddClientFormProps) {
  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addClient(form);
      toast.success("Client added successfully!");
      setForm({
        name: "",
        contactPerson: "",
        email: "",
        phone: "",
        companyName: "",
        address: "",
      });
      setLoading(false);
      onAddSuccess();
    } catch (error) {
      console.error("Error adding client:", error);
      toast.error("Failed to add client.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-5 rounded-2xl bg-white/90 backdrop-blur-lg shadow-xl border border-gray-200 p-6"
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Add New Client
      </h2>

      {/* Inputs */}
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          required
        />
        <input
          type="text"
          name="contactPerson"
          placeholder="Contact Person"
          value={form.contactPerson}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          required
        />
        <textarea
          name="address"
          placeholder="Address (optional)"
          value={form.address}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white font-medium shadow-md hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition"
      >
        {loading ? "Adding..." : "Add Client"}
      </button>
    </form>
  );
}
