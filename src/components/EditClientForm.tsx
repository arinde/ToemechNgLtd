"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateClient } from "@/utils/firestore";
import { X } from "lucide-react";

type ClientWithId = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
};

type EditClientFormProps = {
  client: ClientWithId;
  onClose: () => void;
  onUpdateSuccess: () => void;
};

export default function EditClientForm({
  client,
  onClose,
  onUpdateSuccess,
}: EditClientFormProps) {
  const [form, setForm] = useState({
    name: client.name || "",
    contactPerson: client.contactPerson || "",
    email: client.email || "",
    phone: client.phone || "",
    companyName: client.companyName || "",
    address: client.address || "",
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
      await updateClient(client.id, form);
      toast.success(`${client.companyName} details updated successfully`);
      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error("Error Updating Client:", error);
      toast.error("Failed to update client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
      {/* Modal container */}
      <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl p-6 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-50 flex items-center justify-center rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200 hover:text-red-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto max-h-[80vh] pr-1">
          <h2 className="text-2xl font-bold mb-6">
            Edit Client: {client.companyName}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Client Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={form.contactPerson}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <textarea
              name="address"
              placeholder="Address (optional)"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full border p-3 rounded resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white font-medium shadow-md hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70 transition"
            >
              {loading ? "Updating..." : "Update Client"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
