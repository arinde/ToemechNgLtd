"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { updateClient } from "@/utils/firestore"
import { X } from "lucide-react"

type ClientWithId = {
    id: string;
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    companyName: string
    address: string;
}

type editClientFormProps = {
    client: ClientWithId;
    onClose: () => void;
    onUpdateSuccess: () => void;
}

export default function EditClientForm({
    client, onClose, onUpdateSuccess
}: editClientFormProps) {
    const [form, setForm] = useState({
        name: client.name || "",
        contactPerson: client.contactPerson || "",
        email: client.email || "",
        phone: client.phone || "",
        companyName: client.companyName || "",
        address: client.address || "",
    })
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await updateClient(client.id, form)
            toast.success(client.companyName +  " details updated successfully")
            onUpdateSuccess()
            onClose()
        } catch (error) {
            console.error("Error Updating Client: ", error)
            toast.error("Failed to updated client")
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            onClick={onClose}
        >
            <X />
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Client: {client.companyName}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Client"}
          </button>
        </form>
      </div>
    </div>
    )
}