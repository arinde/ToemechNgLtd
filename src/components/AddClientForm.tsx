// components/AddClientForm.tsx

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
      // Reset form state after successful submission
      setForm({
        name: "",
        contactPerson: "",
        email: "",
        phone: "",
        companyName: "",
        address: "",
      });
      setLoading(false);
      onAddSuccess(); // Notify parent component to refresh data
    } catch (error) {
      console.error("Error adding client:", error);
      toast.error("Failed to add client.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Add New Client</h2>
      <input
        type="text"
        name="name"
        placeholder="Client Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="contactPerson"
        placeholder="Contact Person"
        value={form.contactPerson}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={form.companyName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="address"
        placeholder="Address (optional)"
        value={form.address}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={2}
      />
      
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Client"}
      </button>
    </form>
  );
}