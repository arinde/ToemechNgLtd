// components/EditStaffForm.tsx

"use client";

import { useState} from "react";
import { toast } from "react-hot-toast";
import { updateStaff } from "@/utils/firestore";

interface staffType {
    name: string;
    role: string;
    bio: string;
    
    socials: {
        twitter?: string;
        linkedin?: string;
        email?: string;
    };
    id: string;
}
type EditFormProps = {
    employee: staffType; // Use a more specific type if you want
    onClose: () => void;
    onUpdateSuccess: () => void;
};

export default function EditStaffForm({ employee, onClose, onUpdateSuccess }: EditFormProps) {
    const [form, setForm] = useState({
        name: employee.name || "",
        role: employee.role || "",
        bio: employee.bio || "",
        twitter: employee.socials?.twitter || "",
        linkedin: employee.socials?.linkedin || "",
        email: employee.socials?.email || "", // Assuming you've corrected this field
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const updatedData = {
            name: form.name,
            role: form.role,
            bio: form.bio,
            socials: {
                twitter: form.twitter,
                linkedin: form.linkedin,
                email: form.email,
            },
        };

        try {
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">Edit {employee.name}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
                    <input type="text" name="role" placeholder="Role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded" />
                    <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} className="w-full border p-2 rounded" />
                    <input type="text" name="twitter" placeholder="Twitter" value={form.twitter} onChange={handleChange} className="w-full border p-2 rounded" />
                    <input type="text" name="linkedin" placeholder="LinkedIn" value={form.linkedin} onChange={handleChange} className="w-full border p-2 rounded" />
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />

                    <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" disabled={loading}>
                        {loading ? "Updating..." : "Update Staff"}
                    </button>
                </form>
            </div>
        </div>
    );
}