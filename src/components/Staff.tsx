"use client"

import { useState } from "react"
import { addStaff } from "@/utils/firestore"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Upload from "./Upload"

export default function Staff() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        role: "",
        imageUrl: "",
        bio: "",
        twitter: "", 
        linkedin: "", 
        email: ""
    })
    const [imageUrl, setImageUrl] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        if (!imageUrl) {
            toast.error("Please Upload an Image")
            setLoading(loading)
            return
        }
        try {
            await addStaff({
                name: form.name,
                role: form.role,
                bio: form.bio,
                socials: {
                twitter: form.twitter,
                linkedin: form.linkedin,
                email: form.email,
                },
                imageUrl,
            })

            toast.success("Staff Registered Successfuly")
            setForm({
                name: "",
                role: "",
                imageUrl: "",
                bio: "",
                twitter: "", 
                linkedin: "", 
                email: ""
            })
            setImageUrl("")
            router.push('/dashboard')
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Error adding staff details")
        }

    }
    return(
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
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
      <input type="text" name="twitter" placeholder="Twitter" value={form.twitter} onChange={handleChange} className="w-full border p-2 rounded" />
      <input type="text" name="linkedin" placeholder="LinkedIn" value={form.linkedin} onChange={handleChange} className="w-full border p-2 rounded" />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />

      {/* ⚡ Plug in your existing uploader here */}
      <Upload onUploadSuccess={url => setImageUrl(url)} />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Save Staff
      </button>
    </form>
    )
}